const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"

// ── Strapi raw response shapes ──────────────────────────────────────────

interface StrapiImage {
  id: number
  url: string
  alternativeText: string | null
  width: number
  height: number
  formats: {
    large?: { url: string; width: number; height: number }
    medium?: { url: string; width: number; height: number }
    small?: { url: string; width: number; height: number }
    thumbnail?: { url: string; width: number; height: number }
  } | null
}

interface StrapiCategory {
  id: number
  documentId: string
  name: string
  slug: string
}

interface StrapiTag {
  id: number
  name: string
}

interface StrapiUser {
  id: number
  documentId: string
  username: string
  email: string
}

interface StrapiPost {
  id: number
  documentId: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  category: StrapiCategory | null
  tags: StrapiTag[]
  image: StrapiImage[]
  user?: StrapiUser | null
}

interface StrapiResponse<T> {
  data: T
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// ── Normalized app types ────────────────────────────────────────────────

export interface BlogPost {
  id: number
  documentId: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  categorySlug: string
  tags: string[]
  publishedAt: string
  readingTime: string
  authorName?: string | null
  authorEmail?: string | null
}

export interface Category {
  id: number
  documentId: string
  name: string
  slug: string
}

export interface PaginationMeta {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface PaginatedResult<T> {
  data: T[]
  pagination: PaginationMeta
}

// ── Helpers ─────────────────────────────────────────────────────────────

function getStrapiImageUrl(image: StrapiImage | undefined): string {
  if (!image) return "/placeholder.svg"
  const url = image.formats?.medium?.url || image.formats?.large?.url || image.url
  if (url.startsWith("/")) return `${STRAPI_URL}${url}`
  return url
}

function estimateReadingTime(content: string): string {
  const words = content.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

function generateExcerpt(content: string): string {
  const plain = content
    .replace(/#{1,6}\s/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/\n+/g, " ")
    .trim()
  if (plain.length <= 160) return plain
  return plain.slice(0, 157) + "..."
}

function generateSlug(title: string, documentId: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  return base || documentId
}

function normalizePost(raw: StrapiPost): BlogPost {
  return {
    id: raw.id,
    documentId: raw.documentId,
    slug: generateSlug(raw.title, raw.documentId),
    title: raw.title,
    excerpt: generateExcerpt(raw.content),
    content: raw.content,
    coverImage: getStrapiImageUrl(raw.image?.[0]),
    category: raw.category?.name || "Uncategorized",
    categorySlug: raw.category?.slug || "uncategorized",
    tags: raw.tags?.map((t) => t.name) || [],
    publishedAt: raw.publishedAt,
    readingTime: estimateReadingTime(raw.content),
    authorName: raw.user?.username ?? null,
    authorEmail: raw.user?.email ?? null,
  }
}

// ── Data-fetching functions (server-side) ───────────────────────────────

// Cached indefinitely; invalidated via on-demand revalidation (revalidateTag).
async function strapiFetch<T>(path: string, tags: string[] = ["strapi"]): Promise<T | null> {
  const url = `${STRAPI_URL}${path}`
  try {
    const res = await fetch(url, {
      cache: "force-cache",
      next: { tags },
    })
    if (!res.ok) {
      console.error(`Strapi fetch failed: ${res.status} ${res.statusText} — ${url}`)
      return null
    }
    return res.json()
  } catch (error) {
    console.error(`Strapi connection error for ${url}:`, error)
    return null
  }
}

export async function getAllPosts(
  page = 1,
  pageSize = 25,
): Promise<PaginatedResult<BlogPost>> {
  const json = await strapiFetch<StrapiResponse<StrapiPost[]>>(
    `/api/posts?populate=*&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    ["strapi", "posts"],
  )
  if (!json)
    return {
      data: [],
      pagination: { page, pageSize, pageCount: 0, total: 0 },
    }
  return {
    data: json.data.map(normalizePost),
    pagination: json.meta.pagination,
  }
}

export async function getPostByDocumentId(documentId: string): Promise<BlogPost | null> {
  const json = await strapiFetch<StrapiResponse<StrapiPost[]>>(
    `/api/posts?populate=*&filters[documentId][$eq]=${documentId}`,
    ["strapi", "posts", `post:${documentId}`],
  )
  if (!json || !json.data.length) return null
  return normalizePost(json.data[0])
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // Fetch a large page to search through all posts by slug
  const result = await getAllPosts(1, 100)
  return result.data.find((p) => p.slug === slug) || null
}

export async function getPostsByCategory(
  categorySlug: string,
  page = 1,
  pageSize = 9,
): Promise<PaginatedResult<BlogPost>> {
  if (categorySlug === "all") return getAllPosts(page, pageSize)
  const json = await strapiFetch<StrapiResponse<StrapiPost[]>>(
    `/api/posts?populate=*&filters[category][slug][$eq]=${categorySlug}&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    ["strapi", "posts", `category:${categorySlug}`],
  )
  if (!json)
    return {
      data: [],
      pagination: { page, pageSize, pageCount: 0, total: 0 },
    }
  return {
    data: json.data.map(normalizePost),
    pagination: json.meta.pagination,
  }
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const result = await getAllPosts(1, 3)
  return result.data
}

export async function getRelatedPosts(
  currentDocumentId: string,
  categorySlug: string,
  limit = 3,
): Promise<BlogPost[]> {
  const result = await getPostsByCategory(categorySlug, 1, limit + 1)
  return result.data
    .filter((p) => p.documentId !== currentDocumentId)
    .slice(0, limit)
}

export async function getAllCategories(): Promise<Category[]> {
  const json = await strapiFetch<StrapiResponse<StrapiCategory[]>>(
    "/api/categories",
    ["strapi", "categories"],
  )
  if (!json) return []
  return json.data.map((c) => ({
    id: c.id,
    documentId: c.documentId,
    name: c.name,
    slug: c.slug,
  }))
}

export async function searchPosts(
  query: string,
  page = 1,
  pageSize = 25,
): Promise<PaginatedResult<BlogPost>> {
  if (!query.trim())
    return {
      data: [],
      pagination: { page, pageSize, pageCount: 0, total: 0 },
    }
  const encoded = encodeURIComponent(query)
  const url = `${STRAPI_URL}/api/posts?populate=*&filters[$or][0][title][$containsi]=${encoded}&filters[$or][1][content][$containsi]=${encoded}&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  let json: StrapiResponse<StrapiPost[]> | null = null
  try {
    const res = await fetch(url, { cache: "no-store" })
    if (!res.ok) {
      console.error(`Strapi search failed: ${res.status} ${res.statusText} — ${url}`)
      json = null
    } else {
      json = await res.json()
    }
  } catch (error) {
    console.error(`Strapi connection error for ${url}:`, error)
    json = null
  }
  if (!json)
    return {
      data: [],
      pagination: { page, pageSize, pageCount: 0, total: 0 },
    }
  return {
    data: json.data.map(normalizePost),
    pagination: json.meta.pagination,
  }
}

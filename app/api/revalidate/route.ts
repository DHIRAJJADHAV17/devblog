import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

type Body = {
  secret?: string
  // optional: revalidate a specific post path, e.g. "/blog/my-post"
  path?: string
  // optional: revalidate multiple paths
  paths?: string[]
  // optional: revalidate a specific tag; defaults to "strapi"
  tag?: string
  // optional: revalidate multiple tags
  tags?: string[]

  // Strapi webhook payload fields (v4/v5-ish). We treat these as optional
  // and fall back to broad invalidation if missing.
  event?: string
  model?: string
  entry?: {
    slug?: string
    documentId?: string
    category?: { slug?: string } | null
  }
}

function isAllowedSecret(provided: string | undefined) {
  const expected = process.env.REVALIDATE_SECRET
  if (!expected) return false
  return provided === expected
}

function normalizeStrapiModel(model: unknown) {
  return typeof model === "string" ? model.toLowerCase() : ""
}

export async function POST(req: NextRequest) {
  let body: Body = {}
  try {
    body = await req.json()
  } catch {
    body = {}
  }

  const secret =
    body.secret ||
    req.headers.get("x-revalidate-secret") ||
    req.nextUrl.searchParams.get("secret") ||
    undefined

  if (!isAllowedSecret(secret)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  const tagsFromRequest = [
    ...(body.tag ? [body.tag] : []),
    ...(Array.isArray(body.tags) ? body.tags : []),
  ]

  // If this came from a Strapi webhook, infer additional tags/paths.
  const model = normalizeStrapiModel(body.model)
  const inferredTags: string[] = []
  const inferredPaths: string[] = []

  // Always safe to invalidate the global tag.
  inferredTags.push("strapi")

  // Categories publish/update should refresh categories + blog listing.
  if (model.includes("category")) {
    inferredTags.push("categories")
  }

  // Posts publish/update should refresh posts + specific post path if slug provided.
  if (model.includes("post")) {
    inferredTags.push("posts")
    const slug = body.entry?.slug
    if (typeof slug === "string" && slug.trim()) {
      inferredPaths.push(`/blog/${slug}`)
    }
    const categorySlug = body.entry?.category?.slug
    if (typeof categorySlug === "string" && categorySlug.trim()) {
      inferredTags.push(`category:${categorySlug}`)
    }
    const documentId = body.entry?.documentId
    if (typeof documentId === "string" && documentId.trim()) {
      inferredTags.push(`post:${documentId}`)
    }
  }

  const uniqueTags = Array.from(
    new Set([...(tagsFromRequest.length ? tagsFromRequest : []), ...inferredTags]),
  )

  // 1) Invalidate Strapi fetch cache (tagged in lib/strapi.ts)
  for (const t of uniqueTags) revalidateTag(t, "max")

  // 2) Also invalidate route caches that depend on Strapi data
  revalidatePath("/")
  revalidatePath("/blog")

  const extraPaths = [
    ...(body.path ? [body.path] : []),
    ...(Array.isArray(body.paths) ? body.paths : []),
    ...inferredPaths,
  ]

  for (const p of extraPaths) {
    if (typeof p === "string" && p.startsWith("/")) {
      revalidatePath(p)
    }
  }

  return NextResponse.json({
    ok: true,
    revalidated: true,
    tags: uniqueTags,
    paths: ["/", "/blog", ...extraPaths],
  })
}


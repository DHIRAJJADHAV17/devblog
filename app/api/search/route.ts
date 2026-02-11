import { NextRequest, NextResponse } from "next/server"
import { searchPosts } from "@/lib/strapi"

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") || ""
  const page = Math.max(1, Number(request.nextUrl.searchParams.get("page")) || 1)
  const pageSize = Math.min(50, Math.max(1, Number(request.nextUrl.searchParams.get("pageSize")) || 25))

  if (!query.trim()) {
    return NextResponse.json({
      results: [],
      pagination: { page, pageSize, pageCount: 0, total: 0 },
    })
  }

  try {
    const { data, pagination } = await searchPosts(query, page, pageSize)
    return NextResponse.json({ results: data, pagination })
  } catch {
    return NextResponse.json(
      { results: [], pagination: { page, pageSize, pageCount: 0, total: 0 }, error: "Search failed" },
      { status: 500 },
    )
  }
}

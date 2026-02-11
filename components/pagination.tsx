import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PaginationMeta } from "@/lib/strapi"

interface PaginationProps {
  pagination: PaginationMeta
  /** Base path without query string, e.g. "/blog" */
  basePath: string
  /** Extra search params to preserve (e.g. category) */
  searchParams?: Record<string, string>
}

function buildHref(
  basePath: string,
  page: number,
  extra: Record<string, string> = {},
) {
  const params = new URLSearchParams(extra)
  if (page > 1) {
    params.set("page", String(page))
  } else {
    params.delete("page")
  }
  const qs = params.toString()
  return qs ? `${basePath}?${qs}` : basePath
}

function generatePageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | "...")[] = [1]

  if (current > 3) {
    pages.push("...")
  }

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push("...")
  }

  pages.push(total)

  return pages
}

export function Pagination({
  pagination,
  basePath,
  searchParams = {},
}: PaginationProps) {
  const { page, pageCount, total } = pagination

  if (pageCount <= 1) return null

  const pages = generatePageNumbers(page, pageCount)
  const hasPrev = page > 1
  const hasNext = page < pageCount

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col items-center gap-4 pt-8"
    >
      <div className="flex items-center gap-1">
        {/* Previous */}
        {hasPrev ? (
          <Link
            href={buildHref(basePath, page - 1, searchParams)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
        ) : (
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/30 text-muted-foreground/40"
            aria-disabled="true"
          >
            <ChevronLeft className="h-4 w-4" />
          </span>
        )}

        {/* Page numbers */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="inline-flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
            >
              ...
            </span>
          ) : (
            <Link
              key={p}
              href={buildHref(basePath, p, searchParams)}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                p === page
                  ? "bg-primary text-primary-foreground"
                  : "border border-border/50 text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
              aria-current={p === page ? "page" : undefined}
              aria-label={`Page ${p}`}
            >
              {p}
            </Link>
          ),
        )}

        {/* Next */}
        {hasNext ? (
          <Link
            href={buildHref(basePath, page + 1, searchParams)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/30 text-muted-foreground/40"
            aria-disabled="true"
          >
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </div>

      {/* Info text */}
      <p className="text-xs text-muted-foreground">
        Page {page} of {pageCount} ({total} article{total !== 1 ? "s" : ""})
      </p>
    </nav>
  )
}

"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, X, Loader2 } from "lucide-react"
import type { BlogPost } from "@/lib/strapi"
import { cn } from "@/lib/utils"

function highlightMatch(text: string, query: string) {
  if (!query) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-primary/20 text-primary rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}

function SearchResult({
  post,
  query,
  onClose,
}: {
  post: BlogPost
  query: string
  onClose: () => void
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      onClick={onClose}
      className="flex gap-4 rounded-lg p-3 transition-colors hover:bg-secondary"
    >
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
        <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-foreground line-clamp-1">
          {highlightMatch(post.title, query)}
        </h4>
        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
          {highlightMatch(post.excerpt, query)}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-primary font-medium">
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground">{post.readingTime}</span>
        </div>
      </div>
    </Link>
  )
}

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<BlogPost[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const searchCacheRef = useRef<Map<string, { results: BlogPost[]; totalResults: number }>>(new Map())
  const isMountedRef = useRef(true)
  
  // Cache size limit to prevent memory issues
  const MAX_CACHE_SIZE = 50

  const handleClose = useCallback(() => {
    // Clear any pending debounce timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
      debounceRef.current = null
    }
    setQuery("")
    setResults([])
    onClose()
  }, [onClose])

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setTotalResults(0)
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(async () => {
      // Check if component is still mounted before updating state
      if (!isMountedRef.current) return
      
      const key = query.trim().toLowerCase()
      const cached = searchCacheRef.current.get(key)
      if (cached) {
        if (!isMountedRef.current) return
        setResults(cached.results)
        setTotalResults(cached.totalResults)
        setIsLoading(false)
        return
      }
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        
        // Check again after async operation
        if (!isMountedRef.current) return
        
        const resultsList = data.results || []
        const total = data.pagination?.total ?? resultsList.length
        
        // Limit cache size - remove oldest entries if cache is too large
        if (searchCacheRef.current.size >= MAX_CACHE_SIZE) {
          const firstKey = searchCacheRef.current.keys().next().value
          searchCacheRef.current.delete(firstKey)
        }
        searchCacheRef.current.set(key, { results: resultsList, totalResults: total })
        
        setResults(resultsList)
        setTotalResults(total)
      } catch {
        if (!isMountedRef.current) return
        setResults([])
        setTotalResults(0)
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false)
        }
      }
    }, 300)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [query])

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    }
  }, [open])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        handleClose()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        if (open) handleClose()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open, handleClose])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Set mounted flag and cleanup on component unmount
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      // Clear any pending timeout
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
        debounceRef.current = null
      }
      // Clear cache
      searchCacheRef.current.clear()
    }
  }, [])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-start justify-center bg-background/80 backdrop-blur-sm pt-[10vh]"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Search articles"
    >
      <div className="mx-4 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
        {/* Search Input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, topics, tags..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-label="Search query"
          />
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          <kbd className="hidden rounded border border-border bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground sm:inline-block">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {!query.trim() ? (
            <div className="py-12 text-center">
              <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                Start typing to search articles
              </p>
              <p className="mt-1 text-xs text-muted-foreground/60">
                Search by title, topic, category, or tags
              </p>
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">Searching...</span>
            </div>
          ) : results.length > 0 ? (
            <div>
              <p className="mb-2 px-3 text-xs font-medium text-muted-foreground">
                {totalResults} result{totalResults !== 1 ? "s" : ""} found
                {totalResults > results.length && (
                  <span>, showing first {results.length}</span>
                )}
              </p>
              {results.map((post) => (
                <SearchResult key={post.id} post={post} query={query} onClose={handleClose} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <X className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                No results for &quot;{query}&quot;
              </p>
              <p className="mt-1 text-xs text-muted-foreground/60">
                Try different keywords or browse categories
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function SearchTriggerInline({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg border border-border/40 bg-background/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
    >
      <Search className="h-4 w-4" />
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden rounded border border-border bg-secondary px-1.5 py-0.5 text-xs sm:inline-block">
        {"Ctrl K"}
      </kbd>
    </button>
  )
}

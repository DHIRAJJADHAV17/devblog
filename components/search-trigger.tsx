'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { SearchModal } from '@/components/search-modal'

export function SearchTrigger() {
  const [searchOpen, setSearchOpen] = useState(false)

  // Cmd/Ctrl + K to open search
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <button
        onClick={() => setSearchOpen(true)}
        className='flex items-center gap-2 rounded-lg border border-primary/40 bg-background/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground'
        aria-label='Search articles'
      >
        <Search className='h-4 w-4' />
        <span className='hidden sm:inline'>Search</span>
        <kbd className='hidden rounded border border-border bg-secondary px-1.5 py-0.5 text-xs sm:inline-block'>
          {"⌘K"}
        </kbd>
      </button>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

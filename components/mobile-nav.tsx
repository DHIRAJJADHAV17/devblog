'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SearchModal } from '@/components/search-modal'

interface NavLink {
  label: string
  href: string
}

interface MobileNavProps {
  navLinks: NavLink[]
}

export function MobileNav({ navLinks }: MobileNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <div className='flex items-center gap-2 md:hidden'>
        <button
          onClick={() => setSearchOpen(true)}
          aria-label='Search articles'
          className='rounded-md p-2 text-muted-foreground hover:text-foreground'
        >
          <Search className='h-5 w-5' />
        </button>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className='rounded-md p-2 text-muted-foreground hover:text-foreground'
        >
          {mobileOpen ? (
            <X className='h-5 w-5' />
          ) : (
            <Menu className='h-5 w-5' />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'absolute left-0 right-0 top-16 border-b border-border/40 bg-background/95 backdrop-blur-xl transition-all md:hidden',
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <div className='flex flex-col gap-1 px-4 py-4'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className='rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground'
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

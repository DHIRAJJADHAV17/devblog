import Link from 'next/link'
import { SearchTrigger } from './search-trigger'
import { MobileNav } from './mobile-nav'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Categories', href: '/blog?category=React' },
]

export function Navbar() {
  return (
    <header className='sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl'>
      <nav className='mx-auto flex h-16 max-w-8xl items-center justify-between px-4 sm:px-6'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2.5'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary'>
            <span className='text-sm font-bold text-primary-foreground'>
              Db
            </span>
          </div>
          <span className='text-lg font-semibold text-foreground'>DevBlog</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className='hidden items-center gap-1 md:flex'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop: Search */}
        <div className='hidden items-center gap-3 md:flex'>
          <SearchTrigger />
        </div>

        {/* Mobile: Search icon + Hamburger */}
        <MobileNav navLinks={navLinks} />
      </nav>
    </header>
  )
}

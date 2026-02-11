import Link from 'next/link'

const footerLinks = {
  Blog: [
    { label: 'Latest Posts', href: '/blog' },
    { label: 'React', href: '/blog?category=React' },
    { label: 'Next.js', href: '/blog?category=Next.js' },
    { label: 'TypeScript', href: '/blog?category=TypeScript' },
  ],
  Resources: [
    { label: 'About', href: '/about' },
    { label: 'Style Guide', href: '#' },
    { label: 'RSS Feed', href: '#' },
  ],
  Connect: [
    { label: 'Twitter', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Discord', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className='border-t border-border/40 bg-gradient-to-t from-primary/10 via-card/40 to-background'>
      <div className='mx-auto max-w-8xl px-4 py-12 sm:px-6 sm:py-16'>
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          <div>
            <Link href='/' className='flex items-center gap-2.5'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary'>
                <span className='text-sm font-bold text-primary-foreground'>
                  Db
                </span>
              </div>
              <span className='text-lg font-semibold text-foreground'>
                DevBlog
              </span>
            </Link>
            <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
              Insights and tutorials for modern web developers. Stay ahead with
              the latest in React, Next.js, and beyond.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className='mb-4 text-sm font-semibold text-foreground'>
                {title}
              </h4>
              <ul className='flex flex-col gap-2.5'>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className='text-sm text-muted-foreground transition-colors hover:text-foreground'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row'>
          <p className='text-sm text-muted-foreground'>
            2026 DevBlog. All rights reserved.
          </p>
          <div className='flex gap-6'>
            <Link
              href='#'
              className='text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
              Privacy
            </Link>
            <Link
              href='#'
              className='text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

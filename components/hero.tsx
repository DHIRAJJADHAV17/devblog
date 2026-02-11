import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, PenLine, TrendingUp } from 'lucide-react'

export function Hero() {
  return (
    <section className='relative overflow-hidden border-b border-border/60'>
      {/* Subtle background pattern */}
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(220,13%,90%)_1px,transparent_0)] [background-size:32px_32px] opacity-50' />
        <div className='absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[hsl(162,63%,41%)] opacity-[0.04] blur-[100px]' />
        <div className='absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-[hsl(190,60%,45%)] opacity-[0.04] blur-[100px]' />
      </div>

      <div className='relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36'>
        <div className='grid items-center gap-12 lg:grid-cols-2 lg:gap-16'>
          {/* Left: Text Content */}
          <div>
            <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-sm'>
              <BookOpen className='h-4 w-4 text-primary' />
              <span>Explore 50+ in-depth articles</span>
            </div>

            <h1 className='text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]'>
              Insights for{' '}
              <span className='text-primary'>modern developers</span>
            </h1>

            <p className='mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground'>
              Deep dives into web development, design systems, and software
              engineering. Written by developers, for developers.
            </p>

            <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:items-center'>
              <Button asChild size='lg' className='gap-2'>
                <Link href='/blog'>
                  Read Articles
                  <ArrowRight className='h-4 w-4' />
                </Link>
              </Button>
              <Button asChild variant='outline' size='lg' className='gap-2'>
                <Link href='/about'>Learn about us</Link>
              </Button>
            </div>

            {/* Stats row */}
            <div className='mt-12 flex items-center gap-8'>
              {[
                { value: '50+', label: 'Articles' },
                { value: '10k+', label: 'Readers' },
                { value: '8', label: 'Categories' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className='text-2xl font-bold text-foreground'>
                    {stat.value}
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual card stack */}
          <div className='relative hidden lg:block'>
            <div className='relative mx-auto w-full max-w-md'>
              {/* Background card */}
              <div className='absolute -right-4 -top-4 h-full w-full rounded-2xl border border-border/50 bg-secondary/50' />

              {/* Main card */}
              <div className='relative rounded-2xl border border-border bg-card p-6 shadow-lg'>
                <div className='mb-5 flex items-center gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10'>
                    <PenLine className='h-5 w-5 text-primary' />
                  </div>
                  <div>
                    <p className='text-sm font-semibold text-foreground'>
                      Latest Article
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      Published today
                    </p>
                  </div>
                </div>
                <h3 className='mb-2 text-lg font-semibold text-foreground'>
                  Building Scalable React Architecture
                </h3>
                <p className='mb-4 text-sm leading-relaxed text-muted-foreground'>
                  Learn how to structure large React applications with clean
                  patterns, code-splitting, and module boundaries.
                </p>
                <div className='flex items-center gap-3'>
                  <span className='rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary'>
                    React
                  </span>
                  <span className='rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground'>
                    8 min read
                  </span>
                </div>
              </div>

              {/* Floating mini card */}
              <div className='absolute -bottom-6 -left-6 rounded-xl border border-border bg-card p-4 shadow-md'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(190,60%,45%)]/10'>
                    <TrendingUp className='h-4 w-4 text-[hsl(190,60%,45%)]' />
                  </div>
                  <div>
                    <p className='text-xs font-semibold text-foreground'>
                      Trending
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      TypeScript Tips
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

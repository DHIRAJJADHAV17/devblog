import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { SectionHeading } from '@/components/section-heading'
import { BlogCard } from '@/components/blog-card'
import { Footer } from '@/components/footer'
import { getAllPosts, getFeaturedPosts } from '@/lib/strapi'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home - DevBlog',
  description:
    'A modern blog covering web development, design systems, and software engineering best practices. Featured articles and latest posts for developers.',
}

export default async function Page() {
  const [featuredPosts, latestResult] = await Promise.all([
    getFeaturedPosts(),
    getAllPosts(1, 6),
  ])
  const latestPosts = latestResult.data

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />

      <main>
        <Hero />

        {/* Featured Post */}
        {featuredPosts.length > 0 && (
          <section className='py-12 sm:py-16'>
            <div className='mx-auto max-w-8xl px-4 sm:px-6'>
              <SectionHeading label='Featured' title="Editor's pick" />

              <div className='grid gap-6 lg:grid-cols-2'>
                <BlogCard post={featuredPosts[0]} variant='featured' />
                <div className='flex flex-col gap-4'>
                  {featuredPosts.slice(1).map((post) => (
                    <BlogCard key={post.id} post={post} variant='compact' />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Latest Posts Grid */}
        {latestPosts.length > 0 && (
          <section className='py-12 sm:py-16'>
            <div className='mx-auto max-w-8xl px-4 sm:px-6'>
              <div className='mb-10 flex items-end justify-between'>
                <SectionHeading
                  label='Latest'
                  title='Recent articles'
                  align='left'
                  className='mb-0'
                />
                <Button
                  asChild
                  variant='ghost'
                  className='hidden gap-1 sm:flex'
                >
                  <Link href='/blog'>
                    View all
                    <ArrowRight className='h-4 w-4' />
                  </Link>
                </Button>
              </div>

              <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {latestPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              <div className='mt-8 text-center sm:hidden'>
                <Button asChild variant='outline' className='gap-1'>
                  <Link href='/blog'>
                    View all articles
                    <ArrowRight className='h-4 w-4' />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Empty state when no posts */}
        {latestPosts.length === 0 && featuredPosts.length === 0 && (
          <section className='py-20'>
            <div className='mx-auto max-w-8xl px-4 text-center sm:px-6'>
              <h2 className='text-2xl font-bold text-foreground'>
                No articles yet
              </h2>
              <p className='mt-2 text-muted-foreground'>
                Check back soon for new content!
              </p>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

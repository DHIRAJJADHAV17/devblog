import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Share2, User } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { BlogCard } from '@/components/blog-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/strapi'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  try {
    const result = await getAllPosts(1, 100)
    return result.data.map((post) => ({ slug: post.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Not Found' }
  return {
    title: `${post.title} - DevBlog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.documentId, post.categorySlug)

  // Simple markdown-like rendering
  const contentHtml = post.content
    .split('\n')
    .map((line) => {
      if (line.startsWith('## ')) {
        return `<h2 class="mt-10 mb-4 text-2xl font-bold text-foreground">${line.slice(3)}</h2>`
      }
      if (line.startsWith('### ')) {
        return `<h3 class="mt-8 mb-3 text-xl font-semibold text-foreground">${line.slice(4)}</h3>`
      }
      if (line.startsWith('```')) {
        return line === '```'
          ? '</code></pre>'
          : `<pre class="my-4 overflow-x-auto rounded-lg bg-secondary p-4"><code class="text-sm text-foreground font-mono">`
      }
      if (line.startsWith('- **')) {
        const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/)
        if (match) {
          return `<li class="ml-4 mb-2 text-muted-foreground"><strong class="text-foreground">${match[1]}:</strong> ${match[2]}</li>`
        }
      }
      if (line.startsWith('- ')) {
        return `<li class="ml-4 mb-2 text-muted-foreground">${line.slice(2)}</li>`
      }
      if (line.match(/^\d+\.\s/)) {
        const content = line.replace(/^\d+\.\s/, '')
        const match = content.match(/\*\*(.+?)\*\*:?\s*(.*)/)
        if (match) {
          return `<li class="ml-4 mb-2 text-muted-foreground list-decimal"><strong class="text-foreground">${match[1]}:</strong> ${match[2]}</li>`
        }
        return `<li class="ml-4 mb-2 text-muted-foreground list-decimal">${content}</li>`
      }
      if (line.trim() === '') return '<div class="h-4"></div>'
      return `<p class="mb-4 leading-relaxed text-muted-foreground">${line}</p>`
    })
    .join('\n')

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />

      <main>
        {/* Article Header */}
        <section className='py-12 sm:py-16'>
          <div className='mx-auto max-w-3xl px-4 sm:px-6'>
            <Link
              href='/blog'
              className='mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
              <ArrowLeft className='h-4 w-4' />
              Back to Blog
            </Link>

            <div className='mb-4 flex flex-wrap gap-2'>
              <Badge className='bg-primary/20 text-primary'>
                {post.category}
              </Badge>
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant='outline'>
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className='text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
              {post.title}
            </h1>

            {post.authorName && (
              <div className='mt-4 flex items-center gap-1.5 text-sm text-muted-foreground'>
                <User className='h-4 w-4' />
                {post.authorName}
              </div>
            )}

            <div className='mt-6 flex items-center justify-between'>
              <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                <span className='flex items-center gap-1.5'>
                  <Calendar className='h-4 w-4' />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className='flex items-center gap-1.5'>
                  <Clock className='h-4 w-4' />
                  {post.readingTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Cover Image */}
        {post.coverImage && post.coverImage !== '/placeholder.svg' && (
          <section className='pb-12'>
            <div className='mx-auto max-w-4xl px-4 sm:px-6'>
              <div className='relative aspect-[21/9] overflow-hidden rounded-2xl border border-border/50'>
                <Image
                  src={post.coverImage || '/placeholder.svg'}
                  alt={post.title}
                  fill
                  className='object-cover'
                  priority
                />
              </div>
            </div>
          </section>
        )}

        {/* Article Content */}
        <section className='pb-16'>
          <div className='mx-auto max-w-3xl px-4 sm:px-6'>
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className='border-t border-border/40 py-16'>
            <div className='mx-auto max-w-8xl px-4 sm:px-6'>
              <h2 className='mb-8 text-center text-2xl font-bold text-foreground'>
                Related articles
              </h2>
              <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {relatedPosts.map((related) => (
                  <BlogCard key={related.id} post={related} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

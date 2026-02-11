import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { BlogPost } from '@/lib/strapi'

interface BlogCardProps {
  post: BlogPost
  variant?: 'default' | 'featured' | 'compact'
}

export function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  if (variant === 'featured') {
    return <FeaturedCard post={post} />
  }

  if (variant === 'compact') {
    return <CompactCard post={post} />
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className='group flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:border-border hover:shadow-lg hover:shadow-primary/5'
    >
      <div className='relative aspect-[16/9] overflow-hidden'>
        <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className='object-cover transition-transform duration-500 group-hover:scale-105' />
        <div className='absolute left-3 top-3'>
          <Badge variant='secondary' className='bg-background/80 backdrop-blur-sm'>
            {post.category}
          </Badge>
        </div>
      </div>

      <div className='flex flex-1 flex-col p-5'>
        <h3 className='mb-2 line-clamp-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary'>
          {post.title}
        </h3>
        <p className='mb-4 line-clamp-2 text-sm text-muted-foreground'>
          {post.excerpt}
        </p>

        <div className='mt-auto space-y-2'>
          {post.authorName && (
            <div className='flex items-center gap-1 text-xs text-muted-foreground'>
              <User className='h-3.5 w-3.5' />
              {post.authorName}
            </div>
          )}
          <div className='flex items-center gap-4 text-xs text-muted-foreground'>
            <span className='flex items-center gap-1'>
              <Calendar className='h-3.5 w-3.5' />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className='flex items-center gap-1'>
              <Clock className='h-3.5 w-3.5' />
              {post.readingTime}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className='group relative flex min-h-[400px] flex-col justify-end overflow-hidden rounded-2xl'
    >
      {/* IMAGE WRAPPER */}
      <div className='absolute inset-0'>
        <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className='object-cover transition-transform duration-700 group-hover:scale-105' />
      </div>

      {/* GRADIENT OVERLAY (CLIPPED) */}
      <div className='absolute inset-0 bg-gradient-to-t from-[hsl(220,20%,10%)] via-[hsl(220,20%,10%)]/70 to-transparent' />

      {/* CONTENT */}
      <div className='relative z-10 p-6 sm:p-8'>
        <Badge className='mb-3 bg-[hsl(0,0%,100%)]/20 text-[hsl(0,0%,100%)] backdrop-blur-sm'>
          {post.category}
        </Badge>

        <h3 className='mb-2 text-2xl font-bold text-[hsl(0,0%,100%)] transition-colors group-hover:text-primary sm:text-3xl'>
          {post.title}
        </h3>

        <p className='mb-4 line-clamp-2 max-w-2xl text-sm text-[hsl(0,0%,85%)]'>
          {post.excerpt}
        </p>

        <div className='space-y-2'>
          {post.authorName && (
            <div className='flex items-center gap-1 text-xs text-[hsl(0,0%,75%)]'>
              <User className='h-3.5 w-3.5' />
              {post.authorName}
            </div>
          )}
          <div className='flex items-center gap-4 text-xs text-[hsl(0,0%,75%)]'>
            <span className='flex items-center gap-1'>
              <Calendar className='h-3.5 w-3.5' />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className='flex items-center gap-1'>
              <Clock className='h-3.5 w-3.5' />
              {post.readingTime}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function CompactCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className='group flex gap-4 rounded-lg border border-border/50 bg-card p-4 transition-all hover:border-border hover:shadow-md hover:shadow-primary/5'
    >
      <div className='relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg'>
        <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className='object-cover' />
      </div>
      <div className='flex flex-col justify-center'>
        <Badge variant='outline' className='mb-1 w-fit text-xs'>
          {post.category}
        </Badge>
        <h4 className='line-clamp-2 text-sm font-medium text-foreground transition-colors group-hover:text-primary'>
          {post.title}
        </h4>
        <div className='mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground'>
          {post.authorName && (
            <span className='flex items-center gap-1'>
              <User className='h-3 w-3' />
              {post.authorName}
            </span>
          )}
          <span>{post.readingTime}</span>
        </div>
      </div>
    </Link>
  )
}

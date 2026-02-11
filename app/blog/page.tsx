import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { BlogCard } from '@/components/blog-card'
import { CategoryFilter } from '@/components/category-filter'
import { SectionHeading } from '@/components/section-heading'
import { Pagination } from '@/components/pagination'
import {
  getAllPosts,
  getPostsByCategory,
  getFeaturedPosts,
  getAllCategories,
} from '@/lib/strapi'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - All Articles | DevBlog',
  description:
    'Explore our collection of in-depth articles on web development, design systems, and software engineering. Filter by category and find tutorials, guides, and best practices.',
}

const POSTS_PER_PAGE = 9

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const { category, page } = await searchParams
  const activeCategory = category || 'all'
  const currentPage = Math.max(1, Number(page) || 1)

  const [categories, filteredResult, featuredPosts] = await Promise.all([
    getAllCategories(),
    activeCategory === 'all'
      ? getAllPosts(currentPage, POSTS_PER_PAGE)
      : getPostsByCategory(activeCategory, currentPage, POSTS_PER_PAGE),
    getFeaturedPosts(),
  ])

  const filteredPosts = filteredResult.data
  const pagination = filteredResult.pagination

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />

      <main>
        {/* Page Header */}
        <section className='py-12 sm:py-16'>
          <div className='mx-auto max-w-8xl px-4 sm:px-6'>
            <SectionHeading
              label='Blog'
              title='All articles'
              description='Explore our collection of in-depth articles on web development, design systems, and more.'
            />
            <div className='flex justify-center'>
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
              />
            </div>
          </div>
        </section>

        {/* Featured Highlight (only show when All is selected) */}
        {activeCategory === 'all' && featuredPosts[0] && (
          <section className='pb-12'>
            <div className='mx-auto max-w-8xl px-4 sm:px-6'>
              <BlogCard post={featuredPosts[0]} variant='featured' />
            </div>
          </section>
        )}

        {/* Posts Grid */}
        <section className='pb-16'>
          <div className='mx-auto max-w-8xl px-4 sm:px-6'>
            {filteredPosts.length > 0 ? (
              <>
                <p className='mb-6 text-sm text-muted-foreground'>
                  Showing {filteredPosts.length} of {pagination.total} article
                  {pagination.total !== 1 ? 's' : ''}
                  {activeCategory !== 'all' && (
                    <>
                      {' '}
                      in{' '}
                      <span className='font-medium text-foreground'>
                        {categories.find((c) => c.slug === activeCategory)
                          ?.name || activeCategory}
                      </span>
                    </>
                  )}
                </p>

                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>

                <Pagination
                  pagination={pagination}
                  basePath='/blog'
                  searchParams={
                    activeCategory !== 'all' ? { category: activeCategory } : {}
                  }
                />
              </>
            ) : (
              <div className='py-20 text-center'>
                <h3 className='text-lg font-semibold text-foreground'>
                  No articles found
                </h3>
                <p className='mt-2 text-muted-foreground'>
                  No articles in this category yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

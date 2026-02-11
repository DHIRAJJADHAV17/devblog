import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Category } from "@/lib/strapi"

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: string
}

export function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  return (
    <div className='flex flex-wrap gap-2'>
      {/* "All" tab */}
      <Link
        href='/blog'
        className={cn(
          'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
          activeCategory === 'all'
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        )}
      >
        All
      </Link>

      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/blog?category=${category.slug}`}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
            activeCategory === category.slug
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
          )}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}

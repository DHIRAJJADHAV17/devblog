import { Zap, Layers, Code2, Palette } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

const features = [
  {
    icon: Code2,
    title: 'In-Depth Tutorials',
    description:
      'Step-by-step guides covering real-world patterns, from beginner fundamentals to advanced architecture.',
  },
  {
    icon: Layers,
    title: 'Design Systems',
    description:
      'Learn how to build and maintain scalable component libraries and design tokens for your team.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description:
      'Practical strategies for optimizing Core Web Vitals, bundle sizes, and runtime performance.',
  },
  {
    icon: Palette,
    title: 'Modern CSS',
    description:
      'Explore container queries, cascade layers, view transitions, and the latest CSS features.',
  },
]

export function Features() {
  return (
    <section className='py-16 sm:py-20'>
      <div className='mx-auto max-w-8xl px-4 sm:px-6'>
        <SectionHeading
          label='What we cover'
          title='Topics that matter'
          description='In-depth coverage of the technologies shaping modern web development.'
        />

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className='group rounded-xl border border-border/50 bg-card/50 p-6 transition-all hover:border-primary/30 hover:bg-card'
              >
                <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20'>
                  <Icon className='h-5 w-5' />
                </div>
                <h3 className='mb-2 font-semibold text-foreground'>
                  {feature.title}
                </h3>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

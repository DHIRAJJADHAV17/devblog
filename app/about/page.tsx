import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { Code2, Users, Zap, Target } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - DevBlog',
  description:
    'Learn about our mission to empower developers with in-depth articles, tutorials, and insights on modern web development.',
}

const values = [
  {
    icon: Code2,
    title: 'Developer First',
    description:
      'Every article is written by practicing engineers who solve real problems daily. No fluff, just actionable knowledge.',
  },
  {
    icon: Target,
    title: 'Depth Over Breadth',
    description:
      'We go deep on topics that matter. Our articles are thoroughly researched and technically accurate.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description:
      'Our content is shaped by what the community needs. We listen, learn, and write about what developers want to know.',
  },
  {
    icon: Zap,
    title: 'Always Current',
    description:
      "The web evolves fast. We stay on top of the latest frameworks, patterns, and best practices so you don't have to.",
  },
]

const team = [
  {
    name: 'Alex Chen',
    role: 'Senior Frontend Engineer',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    bio: '10+ years building web apps. Passionate about React, performance, and developer experience.',
  },
  {
    name: 'Sarah Miller',
    role: 'Design Systems Lead',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    bio: 'Bridging the gap between design and engineering. Expert in component architecture and accessibility.',
  },
  {
    name: 'James Park',
    role: 'Full Stack Developer',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    bio: 'TypeScript enthusiast and architecture nerd. Loves building tools that make developers more productive.',
  },
  {
    name: 'Maya Rodriguez',
    role: 'DevOps Engineer',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    bio: 'Making deployments boring since 2018. Specializes in CI/CD, containers, and infrastructure as code.',
  },
]

export default function AboutPage() {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />

      <main>
        {/* Hero */}
        <section className='relative overflow-hidden py-20 sm:py-28'>
          <div className='pointer-events-none absolute inset-0'>
            <div className='absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-[0.05] blur-[120px]' />
          </div>

          <div className='relative mx-auto max-w-8xl px-4 sm:px-6'>
            <div className='mx-auto max-w-3xl text-center'>
              <p className='mb-4 text-sm font-medium uppercase tracking-wider text-primary'>
                About us
              </p>
              <h1 className='text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
                Built by developers,{' '}
                <span className='text-primary'>for developers</span>
              </h1>
              <p className='mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground'>
                We believe every developer deserves access to high-quality,
                practical content that helps them grow. DevBlog is our
                contribution to the community.
              </p>
            </div>
          </div>
        </section>

        {/* About Image */}
        <section className='pb-16'>
          <div className='mx-auto max-w-4xl px-4 sm:px-6'>
            <div className='relative aspect-[21/9] overflow-hidden rounded-2xl border border-border/50'>
              <Image
                src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=500&fit=crop'
                alt='Team collaboration'
                fill
                className='object-cover'
                priority
              />
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className='py-16 sm:py-20'>
          <div className='mx-auto max-w-3xl px-4 sm:px-6'>
            <div className='rounded-2xl border border-border/50 bg-card/50 p-8 sm:p-12'>
              <h2 className='mb-6 text-2xl font-bold text-foreground'>
                Our mission
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                The web development landscape moves at breakneck speed. New
                frameworks, libraries, and patterns emerge constantly. We cut
                through the noise to deliver the content that actually matters
                -- in-depth tutorials, thoughtful analysis, and practical guides
                you can apply immediately.
              </p>
              <p className='mt-4 text-muted-foreground leading-relaxed'>
                Whether you are a junior developer finding your footing or a
                senior engineer exploring the latest advancements, DevBlog has
                something for you.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className='py-16 sm:py-20'>
          <div className='mx-auto max-w-8xl px-4 sm:px-6'>
            <div className='mx-auto mb-12 max-w-2xl text-center'>
              <p className='mb-2 text-sm font-medium uppercase tracking-wider text-primary'>
                Our values
              </p>
              <h2 className='text-balance text-3xl font-bold tracking-tight text-foreground'>
                What drives us
              </h2>
            </div>

            <div className='grid gap-6 sm:grid-cols-2'>
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <div
                    key={value.title}
                    className='rounded-xl border border-border/50 bg-card/50 p-6'
                  >
                    <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10'>
                      <Icon className='h-5 w-5 text-primary' />
                    </div>
                    <h3 className='mb-2 font-semibold text-foreground'>
                      {value.title}
                    </h3>
                    <p className='text-sm leading-relaxed text-muted-foreground'>
                      {value.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className='py-16 sm:py-20'>
          <div className='mx-auto max-w-8xl px-4 sm:px-6'>
            <div className='mx-auto mb-12 max-w-2xl text-center'>
              <p className='mb-2 text-sm font-medium uppercase tracking-wider text-primary'>
                Our team
              </p>
              <h2 className='text-balance text-3xl font-bold tracking-tight text-foreground'>
                Meet the writers
              </h2>
              <p className='mt-3 text-muted-foreground'>
                Experienced engineers who love sharing what they know.
              </p>
            </div>

            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
              {team.map((member) => (
                <div
                  key={member.name}
                  className='rounded-xl border border-border/50 bg-card/50 p-6 text-center'
                >
                  <Image
                    src={member.avatar || '/placeholder.svg'}
                    alt={member.name}
                    width={80}
                    height={80}
                    className='mx-auto mb-4 rounded-full'
                  />
                  <h3 className='font-semibold text-foreground'>
                    {member.name}
                  </h3>
                  <p className='text-sm text-primary'>{member.role}</p>
                  <p className='mt-2 text-sm text-muted-foreground'>
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className='py-16 sm:py-20'>
          <div className='mx-auto max-w-4xl px-4 sm:px-6'>
            <div className='grid grid-cols-2 gap-8 rounded-2xl border border-border/50 bg-card/50 p-8 sm:grid-cols-4 sm:p-12'>
              {[
                { value: '50+', label: 'Articles Published' },
                { value: '10k+', label: 'Monthly Readers' },
                { value: '4', label: 'Expert Writers' },
                { value: '8', label: 'Topic Categories' },
              ].map((stat) => (
                <div key={stat.label} className='text-center'>
                  <div className='text-3xl font-bold text-foreground'>
                    {stat.value}
                  </div>
                  <div className='mt-1 text-sm text-muted-foreground'>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

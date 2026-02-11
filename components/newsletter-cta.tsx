'use client'

import React from 'react'
import { useState } from 'react'
import { Mail } from 'lucide-react'

export function NewsletterCta() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section id='newsletter' className='py-16 sm:py-20'>
      <div className='mx-auto max-w-8xl px-4 sm:px-6'>
        <div className='relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card to-secondary/50 p-8 sm:p-12'>
          <div className='pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/10 blur-3xl' />

          <div className='relative mx-auto max-w-xl text-center'>
            <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
              <Mail className='h-6 w-6 text-primary' />
            </div>
            <h2 className='text-balance text-2xl font-bold text-foreground sm:text-3xl'>
              Stay in the loop
            </h2>
            <p className='mt-3 text-pretty text-muted-foreground'>
              Get the latest articles, tutorials, and insights delivered to your
              inbox. No spam, unsubscribe anytime.
            </p>

            {submitted ? (
              <div className='mt-6 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3'>
                <p className='text-sm text-primary'>
                  Thanks for subscribing! Check your inbox to confirm.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className='mt-6 flex flex-col gap-3 sm:flex-row'
              >
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  required
                  className='flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                  aria-label='Email address'
                />
                <button
                  type='submit'
                  className='rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90'
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

import type { BlogPost, Category } from "@/lib/strapi"

// ── Static fallback categories ──────────────────────────────────────────

export const fallbackCategories: Category[] = [
  { id: 1, documentId: "cat-design-systems", name: "Design Systems", slug: "design-systems" },
  { id: 2, documentId: "cat-web-performance", name: "Web Performance", slug: "web-performance" },
  { id: 3, documentId: "cat-react", name: "React", slug: "react" },
  { id: 4, documentId: "cat-typescript", name: "TypeScript", slug: "typescript" },
  { id: 5, documentId: "cat-devops", name: "DevOps", slug: "devops" },
]

// ── Static fallback posts ───────────────────────────────────────────────

export const fallbackPosts: BlogPost[] = [
  {
    id: 1,
    documentId: "post-design-systems-react-tailwind",
    slug: "building-scalable-design-systems-with-react-and-tailwind",
    title: "Building Scalable Design Systems with React and Tailwind",
    excerpt:
      "Learn how to architect a design system that scales with your team. We cover component composition, theming strategies, and documentation best practices.",
    content: `## Why Design Systems Matter

In today's fast-paced development environment, design systems have become essential for maintaining consistency and speeding up development. A well-built design system serves as the single source of truth for your team.

## Component Architecture

The foundation of any good design system is its component architecture. Here are the key principles:

- **Atomic Design**: Break components into atoms, molecules, organisms, templates, and pages
- **Composition over Inheritance**: Use composition patterns to build complex components from simple ones
- **Single Responsibility**: Each component should do one thing well

## Theming with Tailwind CSS

Tailwind CSS provides an excellent foundation for design system theming:

### CSS Custom Properties

Use CSS variables for dynamic theming:

\`\`\`css
:root {
  --primary: 250 80% 55%;
  --secondary: 240 10% 15%;
}
\`\`\`

### Design Tokens

Define your design tokens in your Tailwind config:

- **Colors**: Primary, secondary, accent, and semantic colors
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Consistent spacing scale based on a base unit
- **Borders**: Border widths, radii, and colors

## Documentation Best Practices

Good documentation is what separates a design system from a component library:

1. **Storybook Integration**: Use Storybook for interactive component documentation
2. **Usage Guidelines**: Provide clear dos and don'ts for each component
3. **Accessibility Notes**: Document ARIA attributes and keyboard interactions
4. **Migration Guides**: Help teams adopt new versions smoothly

## Conclusion

Building a design system is an investment that pays dividends as your team and product grow. Start small, iterate often, and always keep your users — both developers and end users — in mind.`,
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop",
    category: "Design Systems",
    categorySlug: "design-systems",
    tags: ["React", "Tailwind CSS", "Design Systems", "Component Architecture"],
    publishedAt: "2026-02-05T10:00:00.000Z",
    readingTime: "8 min read",
  },
  {
    id: 2,
    documentId: "post-web-performance-core-vitals",
    slug: "optimizing-core-web-vitals-for-next-js-applications",
    title: "Optimizing Core Web Vitals for Next.js Applications",
    excerpt:
      "A comprehensive guide to measuring and improving your Core Web Vitals scores. Learn practical techniques for LCP, FID, and CLS optimization.",
    content: `## Understanding Core Web Vitals

Core Web Vitals are a set of specific factors that Google considers important in a webpage's overall user experience. They consist of three specific page speed and user interaction measurements.

## Largest Contentful Paint (LCP)

LCP measures the time it takes for the largest content element to become visible:

- **Optimize Images**: Use next/image for automatic optimization
- **Preload Critical Assets**: Use link preload for above-the-fold content
- **Server-Side Rendering**: Leverage Next.js SSR for faster initial paint

## First Input Delay (FID)

FID measures the time from first user interaction to browser response:

- **Code Splitting**: Break large bundles into smaller chunks
- **Defer Non-Critical JavaScript**: Use dynamic imports for below-the-fold components
- **Web Workers**: Offload heavy computations to background threads

## Cumulative Layout Shift (CLS)

CLS measures visual stability of the page:

- **Set Image Dimensions**: Always specify width and height
- **Reserve Space for Ads**: Use placeholder elements
- **Avoid Dynamic Content Insertion**: Use CSS containment

## Conclusion

Optimizing Core Web Vitals is an ongoing process. Use Lighthouse and the Web Vitals library to continuously monitor and improve your scores.`,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    category: "Web Performance",
    categorySlug: "web-performance",
    tags: ["Performance", "Next.js", "Core Web Vitals", "SEO"],
    publishedAt: "2026-02-03T10:00:00.000Z",
    readingTime: "6 min read",
  },
  {
    id: 3,
    documentId: "post-react-server-components",
    slug: "understanding-react-server-components",
    title: "Understanding React Server Components",
    excerpt:
      "Dive deep into React Server Components and learn how they change the way we build React applications. Explore the benefits and trade-offs.",
    content: `## What Are Server Components?

React Server Components (RSC) represent a fundamental shift in how we build React applications. They allow components to render on the server, sending only the resulting HTML and minimal JavaScript to the client.

## Key Benefits

- **Zero Bundle Size Impact**: Server Components don't add to your client bundle
- **Direct Backend Access**: Query databases and access file systems directly
- **Automatic Code Splitting**: The framework handles splitting for you
- **Streaming**: Components can stream their content progressively

## Server vs Client Components

Understanding when to use each type is crucial:

### Use Server Components When:
- Fetching data from a database or API
- Accessing backend resources directly
- Keeping sensitive information on the server
- Reducing client-side JavaScript

### Use Client Components When:
- Adding interactivity with event handlers
- Using React hooks like useState or useEffect
- Working with browser-only APIs
- Managing client-side state

## Practical Patterns

### Data Fetching
Server Components make data fetching straightforward:

\`\`\`tsx
async function BlogPost({ id }) {
  const post = await db.posts.findUnique({ where: { id } })
  return <article>{post.content}</article>
}
\`\`\`

### Composition Pattern
Mix server and client components effectively:

- Keep data fetching in Server Components
- Pass data to Client Components as props
- Use the "children" pattern for flexibility

## Conclusion

React Server Components are not just a performance optimization — they represent a new mental model for building React applications. Embrace the server-first approach while using client components where interactivity is needed.`,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
    category: "React",
    categorySlug: "react",
    tags: ["React", "Server Components", "Next.js", "Architecture"],
    publishedAt: "2026-01-28T10:00:00.000Z",
    readingTime: "10 min read",
  },
  {
    id: 4,
    documentId: "post-typescript-advanced-patterns",
    slug: "advanced-typescript-patterns-for-large-scale-apps",
    title: "Advanced TypeScript Patterns for Large-Scale Apps",
    excerpt:
      "Master advanced TypeScript patterns including conditional types, template literal types, and branded types for building robust applications.",
    content: `## Beyond the Basics

TypeScript offers powerful features that go far beyond basic type annotations. Mastering these advanced patterns can significantly improve your codebase quality.

## Conditional Types

Conditional types let you create types that depend on other types:

- **Type Narrowing**: Use conditional types to narrow union types
- **Distributive Conditionals**: Automatically distribute over union types
- **Infer Keyword**: Extract types from complex structures

## Template Literal Types

Template literal types enable string manipulation at the type level:

- **Route Typing**: Create type-safe route parameters
- **Event Handlers**: Generate handler names from event names
- **CSS Properties**: Type CSS custom property names

## Branded Types

Branded types add nominal typing to TypeScript's structural type system:

- **ID Types**: Distinguish between different ID types (UserId vs PostId)
- **Units**: Prevent mixing different units (Pixels vs Rem)
- **Validation**: Represent validated data at the type level

## Utility Type Patterns

Build custom utility types for common patterns:

1. **DeepPartial**: Make all nested properties optional
2. **StrictOmit**: A stricter version of Omit that validates keys
3. **Prettify**: Flatten intersection types for better intellisense

## Conclusion

Advanced TypeScript patterns are tools in your toolbox. Use them judiciously where they add clarity and safety, but don't over-engineer simple code.`,
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop",
    category: "TypeScript",
    categorySlug: "typescript",
    tags: ["TypeScript", "Advanced Patterns", "Type Safety"],
    publishedAt: "2026-01-25T10:00:00.000Z",
    readingTime: "7 min read",
  },
  {
    id: 5,
    documentId: "post-devops-docker-kubernetes",
    slug: "containerizing-next-js-apps-with-docker",
    title: "Containerizing Next.js Apps with Docker",
    excerpt:
      "Step-by-step guide to containerizing your Next.js applications with Docker and deploying them to Kubernetes for production workloads.",
    content: `## Why Containerize?

Containers provide a consistent environment from development to production, eliminating the "works on my machine" problem.

## Docker Setup

### Multi-Stage Builds

Use multi-stage builds to keep your images small:

- **Stage 1 - Dependencies**: Install all node_modules
- **Stage 2 - Build**: Build the Next.js application
- **Stage 3 - Production**: Copy only the necessary files

### Optimizing the Dockerfile

Key optimizations for Next.js Docker builds:

- Use standalone output mode in next.config
- Leverage Docker layer caching for dependencies
- Use Alpine-based Node images for smaller size
- Set proper NODE_ENV and memory limits

## Kubernetes Deployment

### Resource Configuration

Configure resources appropriately:

- **CPU Requests**: Start with 100m-250m per pod
- **Memory Limits**: Typically 256Mi-512Mi for Next.js apps
- **Horizontal Pod Autoscaler**: Scale based on CPU or custom metrics

### Health Checks

Implement proper health checks:

1. **Liveness Probe**: Restart unhealthy pods
2. **Readiness Probe**: Only route traffic to ready pods
3. **Startup Probe**: Handle slow-starting applications

## Conclusion

Containerizing your Next.js app might seem like overhead initially, but it pays off immensely in deployment consistency and scalability.`,
    coverImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=450&fit=crop",
    category: "DevOps",
    categorySlug: "devops",
    tags: ["Docker", "Kubernetes", "DevOps", "Next.js"],
    publishedAt: "2026-01-20T10:00:00.000Z",
    readingTime: "9 min read",
  },
  {
    id: 6,
    documentId: "post-react-state-management-2026",
    slug: "modern-state-management-in-react-2026",
    title: "Modern State Management in React (2026)",
    excerpt:
      "Explore the current state management landscape including Zustand, Jotai, and the built-in React APIs that might be all you need.",
    content: `## The State of State Management

The React state management ecosystem has matured significantly. Let's explore what options make sense in 2026.

## Built-in React APIs

Before reaching for a library, consider what React provides:

- **useState**: For simple local state
- **useReducer**: For complex state logic
- **useContext**: For sharing state across components
- **useSyncExternalStore**: For subscribing to external stores

## Zustand

Zustand has become the go-to lightweight state management solution:

- **Minimal Boilerplate**: Create stores with simple functions
- **No Provider Required**: Access stores anywhere without wrapping
- **Middleware Support**: Add persistence, devtools, and more
- **TypeScript First**: Excellent type inference out of the box

## Jotai

Jotai offers an atomic approach to state management:

- **Atomic Model**: Break state into independent atoms
- **Derived State**: Compose atoms to create derived values
- **Suspense Integration**: Works seamlessly with React Suspense
- **Small Bundle**: Minimal impact on your bundle size

## When to Use What

1. **Simple Component State**: useState or useReducer
2. **Shared UI State**: Zustand or Jotai
3. **Server State**: SWR or React Query
4. **Form State**: React Hook Form or Conform
5. **URL State**: nuqs or Next.js searchParams

## Conclusion

The best state management solution is the simplest one that meets your needs. Start with React's built-in tools and add libraries only when you outgrow them.`,
    coverImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=450&fit=crop",
    category: "React",
    categorySlug: "react",
    tags: ["React", "State Management", "Zustand", "Jotai"],
    publishedAt: "2026-01-15T10:00:00.000Z",
    readingTime: "6 min read",
  },
]

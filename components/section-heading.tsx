import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  label?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10", align === "center" && "text-center", className)}>
      {label && (
        <p className='mb-2 text-sm font-medium uppercase tracking-wider text-primary'>
          {label}
        </p>
      )}
      <h2 className='text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
        {title}
      </h2>
      {description && (
        <p className='mt-3 text-pretty text-lg text-muted-foreground'>
          {description}
        </p>
      )}
    </div>
  )
}

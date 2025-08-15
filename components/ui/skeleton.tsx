import { HTMLAttributes } from 'react'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Skeleton({ className = '', ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className}`}
      {...props}
    />
  )
}

// Предустановленные варианты для удобства
export function SkeletonText({ className = '', ...props }: SkeletonProps) {
  return <Skeleton className={`h-4 w-full ${className}`} {...props} />
}

export function SkeletonButton({ className = '', ...props }: SkeletonProps) {
  return <Skeleton className={`h-10 w-24 ${className}`} {...props} />
}

export function SkeletonAvatar({ className = '', ...props }: SkeletonProps) {
  return <Skeleton className={`h-12 w-12 rounded-full ${className}`} {...props} />
}

export function SkeletonCard({ className = '', ...props }: SkeletonProps) {
  return (
    <div className={`space-y-3 ${className}`} {...props}>
      <Skeleton className="h-32 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}

export function SkeletonList({ 
  count = 3, 
  className = '', 
  ...props 
}: SkeletonProps & { count?: number }) {
  return (
    <div className={`space-y-3 ${className}`} {...props}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <SkeletonAvatar />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  )
}
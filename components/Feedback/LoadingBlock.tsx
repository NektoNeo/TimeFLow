'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingBlockProps {
  className?: string;
  lines?: number;
  showCard?: boolean;
}

export function LoadingBlock({ 
  className = '', 
  lines = 3,
  showCard = true 
}: LoadingBlockProps) {
  const content = (
    <div className={`space-y-3 ${!showCard ? className : ''}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4 w-full"
          style={{
            width: i === lines - 1 ? '60%' : '100%'
          }}
        />
      ))}
    </div>
  );

  if (!showCard) return content;

  return (
    <Card className={`p-6 ${className}`}>
      {content}
    </Card>
  );
}

// Profile skeleton
export function ProfileSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-4 mb-6">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </Card>
  );
}

// List skeleton
export function ListSkeleton({ items = 3 }: { items?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, i) => (
        <Card key={i} className="p-4">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// Grid skeleton for cards
export function GridSkeleton({ items = 4 }: { items?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: items }).map((_, i) => (
        <Card key={i} className="p-6">
          <Skeleton className="h-12 w-12 rounded mb-3" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2" />
        </Card>
      ))}
    </div>
  );
}

// Inline loading for buttons/actions
export function InlineLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
      <span>{text}</span>
    </div>
  );
}
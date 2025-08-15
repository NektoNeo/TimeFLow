'use client';

import { AlertCircle, RefreshCw, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import haptics from '@/lib/haptics';

// Использование
haptics.impact('light')
haptics.notificationSuccess()

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  isNetworkError?: boolean;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  isNetworkError = false,
  className = ''
}: ErrorStateProps) {
  const handleRetry = () => {
    haptics.light();
    onRetry?.();
  };

  const Icon = isNetworkError ? WifiOff : AlertCircle;
  const defaultNetworkMessage = 'Please check your internet connection and try again.';
  const displayMessage = isNetworkError && !message ? defaultNetworkMessage : message;

  return (
    <Card className={`p-8 text-center ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        <div className="rounded-full bg-destructive/10 p-3">
          <Icon className="h-8 w-8 text-destructive" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            {displayMessage}
          </p>
        </div>

        {onRetry && (
          <Button
            onClick={handleRetry}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
}

// Compact inline error for forms or smaller spaces
export function ErrorMessage({
  message,
  onRetry,
  className = ''
}: {
  message: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 text-sm text-destructive ${className}`}>
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span className="flex-1">{message}</span>
      {onRetry && (
        <Button
          onClick={() => {
            haptics.light();
            onRetry();
          }}
          variant="ghost"
          size="sm"
          className="h-auto p-1 text-xs"
        >
          Retry
        </Button>
      )}
    </div>
  );
}
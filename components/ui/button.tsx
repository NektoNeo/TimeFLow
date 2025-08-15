import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
    
    const variants = {
      primary: 'bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] hover:opacity-90',
      secondary: 'bg-[var(--tg-theme-secondary-bg-color)] text-[var(--tg-theme-text-color)] hover:opacity-90',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
      ghost: 'hover:bg-[var(--tg-theme-secondary-bg-color)]'
    }
    
    const sizes = {
      sm: 'text-sm px-3 py-1.5',
      md: 'px-4 py-2',
      lg: 'text-lg px-6 py-3'
    }
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
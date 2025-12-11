import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'glass'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-2xl p-6',
                    {
                        'bg-white shadow-sm': variant === 'default',
                        'bg-white/40 backdrop-blur-md border border-white/50': variant === 'glass',
                    },
                    className
                )}
                {...props}
            />
        )
    }
)
Card.displayName = 'Card'

export { Card }

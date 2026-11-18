import { type HTMLAttributes, forwardRef } from 'react';

type CardVariant = 'default' | 'industrial';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

const variantClasses: Record<CardVariant, string> = {
  default: 'bevel-card',
  industrial: 'industrial-card',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    const classes = [
      variantClasses[variant],
      'flex flex-col h-full p-6 gap-3',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

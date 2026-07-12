import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300',
        secondary:
          'border-transparent bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
        destructive:
          'border-transparent bg-error-100 text-error-700 dark:bg-error-900 dark:text-error-300',
        outline:
          'text-neutral-700 dark:text-neutral-300',
        success:
          'border-transparent bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-300',
        warning:
          'border-transparent bg-warning-100 text-warning-700 dark:bg-warning-900 dark:text-warning-300',
        info:
          'border-transparent bg-info-100 text-info-700 dark:bg-info-900 dark:text-info-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

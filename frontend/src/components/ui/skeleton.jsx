import * as React from 'react';
import { cn } from '../../lib/utils';

const Skeleton = ({ className, ...props }) => (
  <div
    className={cn(
      'animate-pulse-soft rounded-md bg-neutral-200 dark:bg-neutral-700',
      className
    )}
    aria-hidden="true"
    {...props}
  />
);
Skeleton.displayName = 'Skeleton';

export { Skeleton };

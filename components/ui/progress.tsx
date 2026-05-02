/** @format */
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  getValueLabel?: (value: number) => string;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, getValueLabel, ...props }, ref) => {
    // Validate `max`
    let maxValue = typeof max === 'number' ? max : 100;
    if (
      typeof maxValue !== 'number' ||
      Number.isNaN(maxValue) ||
      maxValue <= 0
    ) {
      console.error(
        'Invalid prop "max" of value "' +
          String(max) +
          '" supplied to "Progress". Only numbers greater than 0 are valid max values. Defaulting to "100".'
      );
      maxValue = 100;
    }

    // Validate `value`
    let currentValue =
      typeof value === 'number' && !Number.isNaN(value) ? value : 0;
    if (currentValue < 0 || currentValue > maxValue) {
      console.warn(
        'Warning: prop "value" of value "' +
          String(value) +
          `" supplied to "Progress" is outside the range 0..${maxValue}. It will be clamped.`
      );
    }

    const clamped = Math.min(Math.max(currentValue, 0), maxValue);
    const percent = maxValue === 0 ? 0 : (clamped / maxValue) * 100;

    // Accessible label (screen reader)
    const srLabel = getValueLabel
      ? getValueLabel(clamped)
      : `${Math.round(percent)}%`;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={maxValue}
        aria-valuenow={
          Number.isFinite(currentValue) ? Math.round(clamped) : undefined
        }
        aria-label={srLabel}
        className={cn(
          'relative w-full bg-muted rounded-full overflow-hidden',
          className
        )}
        {...props}
      >
        {/* background track (fills container) */}
        <div className="h-full w-full pointer-events-none">
          {/* filled bar */}
          <div
            className="h-full bg-primary rounded-sm transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>

        <span className="sr-only">{srLabel}</span>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

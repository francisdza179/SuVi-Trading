"use client";

import { type InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="font-heading text-sm font-medium text-steel">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'rounded-md border border-concrete-300 bg-insulation px-4 py-3 font-body text-steel placeholder:text-steel-500',
            'focus:border-blueprint focus:outline-none focus:ring-1 focus:ring-blueprint',
            'disabled:opacity-50',
            className,
          ].join(' ')}
          {...props}
        />
        {error && <span className="text-sm text-copper">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

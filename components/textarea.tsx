"use client";

import { type TextareaHTMLAttributes, forwardRef } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const textareaId = id ?? props.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="font-heading text-sm font-medium text-steel">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={[
            'min-h-[120px] resize-y rounded-md border border-concrete-300 bg-insulation px-4 py-3 font-body text-steel placeholder:text-steel-500',
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

Textarea.displayName = 'Textarea';

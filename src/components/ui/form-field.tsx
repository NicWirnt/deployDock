'use client';

import { useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function FormField({ label, help, error, id, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; help?: string; error?: string }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const description = error ?? help;
  return <div className="form-field">
    <label htmlFor={inputId}>{label}{props.required && <span aria-hidden="true"> *</span>}</label>
    <input id={inputId} className={cn('form-input', className)} aria-invalid={error ? true : undefined} aria-describedby={description ? `${inputId}-description` : undefined} {...props} />
    {description && <p id={`${inputId}-description`} className={error ? 'field-error' : 'field-help'}>{description}</p>}
  </div>;
}

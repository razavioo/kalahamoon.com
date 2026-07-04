import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDirection(locale: string): 'ltr' | 'rtl' {
  return ['fa', 'ar', 'ckb'].includes(locale) ? 'rtl' : 'ltr';
}

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTothousand(number: number) {
  const formatter = new Intl.NumberFormat('id-ID');

  return formatter.format(number);
}

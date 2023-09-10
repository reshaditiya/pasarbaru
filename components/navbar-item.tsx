'use client';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navItems } from '@/config/site';

export function NavbarItem({ className }: { className: string }) {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className={cn('flex gap-6', className)}>
      {navItems?.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary text-primary',
            item.href.startsWith(`/${segment?.replace(/[()]/gi, '')}`)
              ? 'text-primary'
              : 'text-primary/60',
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

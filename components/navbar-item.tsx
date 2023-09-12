'use client';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navItems } from '@/config/site';
import { Button } from './ui/button';

type NavbarItemProps = {
  className?: string;
};

export function NavbarItem({ className }: NavbarItemProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className={cn('flex flex-col gap-2 md:flex-row md:gap-4', className)}>
      {navItems?.map((item) => (
        <Button
          key={item.href}
          variant="link"
          size="sm"
          className={cn(
            'text-md justify-start font-medium text-primary transition-colors hover:text-primary md:text-sm',
            item.href.startsWith(`/${segment?.replace(/[()]/gi, '')}`)
              ? 'text-primary'
              : 'text-primary/60',
          )}
          asChild
        >
          <Link href={item.href}>{item.label}</Link>
        </Button>
      ))}
    </nav>
  );
}

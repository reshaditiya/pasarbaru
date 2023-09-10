'use client';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navItems } from '@/config/site';
import { Button } from './ui/button';

type NavbarItemProps = {
  variant?: 'mobile' | 'desktop';
  className?: string;
};

export function NavbarItem({
  variant = 'desktop',
  className,
}: NavbarItemProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <nav
      className={cn(
        'flex gap-4',
        className,
        variant === 'mobile' && 'flex-col',
      )}
    >
      {navItems?.map((item) => (
        <Button
          key={item.href}
          variant="link"
          size="sm"
          className="justify-start"
          asChild
        >
          <Link
            href={item.href}
            className={cn(
              'text-sm font-medium text-primary transition-colors hover:text-primary',
              item.href.startsWith(`/${segment?.replace(/[()]/gi, '')}`)
                ? 'text-primary'
                : 'text-primary/60',
            )}
          >
            {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
}

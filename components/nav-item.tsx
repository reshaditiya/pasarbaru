'use client';
import * as React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navItems } from '@/config/site';

export function NavItem() {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      {navItems?.length ? (
        <nav className="flex gap-6">
          {navItems?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex items-center text-sm font-medium transition-colors hover:text-gray-950/80',
                item.href.startsWith(`/${segment?.replace(/[()]/gi, '')}`)
                  ? 'text-gray-950'
                  : 'text-gray-950/60',
                item.disabled && 'cursor-not-allowed opacity-80',
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </>
  );
}

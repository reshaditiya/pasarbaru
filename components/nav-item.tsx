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
				<nav className='hidden gap-6 md:flex'>
					{navItems?.map((item, index) => (
						<Link
							key={index}
							href={item.disabled ? '#' : item.href}
							className={cn(
								'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
								item.href.startsWith(`/${segment}`)
									? 'text-foreground'
									: 'text-foreground/60',
								item.disabled && 'cursor-not-allowed opacity-80'
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

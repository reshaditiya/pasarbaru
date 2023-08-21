import * as React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Storefront } from '@/components/icon/phospor';
import UserAccountNav from './user-account-nav';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { NavItem } from './nav-item';
import { cookies } from 'next/headers';
import { Button } from './ui/button';

export default async function MainNav() {
	const supabase = createServerComponentClient({ cookies });
	const session = await supabase.auth.getSession();

	return (
		<nav className='flex justify-between py-2 px-4 border-b h-16 items-center'>
			<Link href='/' className='items-center space-x-2 flex'>
				<Storefront className='w-6 h-6' weight='bold' />
				<span className='font-bold sm:inline-block'>{siteConfig.name}</span>
			</Link>
			<NavItem />
			{session.data.session ? (
				<UserAccountNav />
			) : (
				<Button variant='outline' asChild>
					<Link href='/signin'>Masuk</Link>
				</Button>
			)}
		</nav>
	);
}

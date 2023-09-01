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
    <nav className="flex h-16 items-center justify-between border-b px-4 py-2">
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center space-x-2">
          <Storefront className="h-6 w-6" weight="bold" />
          <span className="font-bold sm:inline-block">{siteConfig.name}</span>
        </Link>
        <NavItem />
      </div>
      {session.data.session ? (
        <UserAccountNav />
      ) : (
        <Button variant="outline" asChild>
          <Link href="/signin">Masuk</Link>
        </Button>
      )}
    </nav>
  );
}

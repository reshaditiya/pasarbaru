import * as React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import UserAccountNav from './user-account-nav';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { NavbarItem } from './navbar-item';
import { cookies } from 'next/headers';
import { Button } from './ui/button';
import { ShoppingBag } from 'lucide-react';

export default async function Navbar() {
  const supabase = createServerComponentClient({ cookies });
  const session = await supabase.auth.getSession();

  return (
    <nav className="flex h-16 items-center border-b px-4 py-2">
      <Link href="/" className="flex items-center space-x-2">
        <ShoppingBag className="h-5 w-5" strokeWidth={2.5} />
        <span className="font-bold sm:inline-block">{siteConfig.name}</span>
      </Link>
      <NavbarItem className="ml-16" />
      {session.data.session ? (
        <UserAccountNav className="ml-auto" />
      ) : (
        <Button variant="outline" className="ml-auto" asChild>
          <Link href="/signin">Masuk</Link>
        </Button>
      )}
    </nav>
  );
}

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactElement } from 'react';
import { type Database } from '@/types/supabase';

export default async function withAuth(children: ReactElement) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/signin');

  return children;
}

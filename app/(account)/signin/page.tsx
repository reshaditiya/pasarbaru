import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Database } from '@/types/supabase';
import SigninForm from '@/components/auth/signin-form';

export default async function page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) redirect('/');
  return (
    <main className="flex h-screen items-center justify-center">
      <SigninForm />
    </main>
  );
}

import withAuth from '@/components/account/with-auth';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const userData = await supabase.auth.getUser();

  return withAuth(
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(userData, null, 2)}
    </main>,
  );
}

import { Separator } from '@/components/ui/separator';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';
import OwnerForm from '@/components/account-info/owner-form';

export default async function page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const user = await supabase.auth.getUser();
  const owner = await supabase
    .from('toko')
    .select('nama_pemilik, email, no_hp')
    .eq('id', user.data.user?.id!)
    .single();

  return (
    <main className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Data Pemilik</h3>
        <p className="text-sm text-muted-foreground">
          Data pemilik bersifat privat dan hanya digunakan untuk kebutuhan
          internal.
        </p>
      </div>
      <Separator />
      <OwnerForm owner={owner.data} />
    </main>
  );
}

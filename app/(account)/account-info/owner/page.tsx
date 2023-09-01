import { Separator } from '@/components/ui/separator';
import Ownerform from './components/owner-form';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const user = await supabase.auth.getUser();
  const owner = await supabase
    .from('toko')
    .select('nama_pemilik, email, no_hp')
    .eq('id', user.data.user?.id)
    .single();

  return (
    <main className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Data Pemilik</h3>
        <p className="text-muted-foreground text-sm">
          Data pemilik bersifat privat dan hanya digunakan untuk kebutuhan
          internal.
        </p>
      </div>
      <Separator />
      <Ownerform owner={owner.data} />
    </main>
  );
}

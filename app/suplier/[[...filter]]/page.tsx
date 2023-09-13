import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { SuplierCard } from '@/components/suplier/suplier-card';
import type { Database } from '@/types/supabase';
import EmptyState from '@/components/empty-state';

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filterKeyword = searchParams.keyword;
  const supabase = createServerComponentClient<Database>({ cookies });
  const user = await supabase.auth.getUser();
  const query = supabase
    .from('suplier')
    .select(
      'id, nama, alamat, kabupaten, kecamatan, desa, foto, email, web, no_hp',
    )
    .eq('id_toko', user.data.user?.id!)
    .order('created_at', { ascending: true });
  if (filterKeyword) query.ilike('nama', `%${filterKeyword}%`);

  const supliers = await query;

  if (supliers.data?.length === 0)
    return (
      <EmptyState
        className="mx-auto mt-32 w-3/4 text-muted-foreground lg:my-auto"
        title="Suplier Kosong!"
        description="Tidak ada suplier yang tersedia silahkan menambahkan suplier untuk menampilkannya."
      />
    );
  return (
    <section className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:ml-6 lg:mt-0 lg:w-3/4">
      {supliers.data?.map((suplier) => (
        <SuplierCard key={suplier.id} suplier={suplier} />
      ))}
    </section>
  );
}

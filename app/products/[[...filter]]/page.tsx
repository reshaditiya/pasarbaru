import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';
import ProductCard from '@/components/products/product-card';
import EmptyState from '@/components/empty-state';
import { ProductFormButton } from '@/components/products/product-form-button';

export default async function Page({
  params,
}: {
  params: { filter: string[] };
}) {
  const [filterJenis, filterKeyword] = params.filter ?? [];
  const supabase = createServerComponentClient<Database>({ cookies });
  const user = await supabase.auth.getUser();
  const queryProducts = supabase
    .from('produk')
    .select(
      'id, id_toko, nama, jenis, harga_beli, harga_jual, foto1, foto2, foto3, satuan',
    )
    .eq('id_toko', user.data.user?.id!)
    .order('created_at', { ascending: true });

  if (filterJenis && filterJenis !== 'all')
    queryProducts.eq('jenis', decodeURI(filterJenis));
  if (filterKeyword) queryProducts.ilike('nama', `%${filterKeyword}%`);

  const products = await queryProducts;

  if (products.data?.length === 0)
    return (
      <EmptyState
        className="mx-auto mt-32 w-3/4 text-muted-foreground lg:my-auto"
        title="Produk Kosong!"
        description="Tidak ada produk yang tersedia silahkan menambahkan produk untuk menampilkannya."
      />
    );
  return (
    <section className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:ml-6 lg:mt-0 lg:w-3/4">
      {products.data?.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </section>
  );
}

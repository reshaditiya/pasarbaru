import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';
import ProductCard from '@/components/products/product-card';

export default async function Page({
  params,
}: {
  params: { filter: string[] };
}) {
  // const [filterJenis, filterKeyword] = params.filter ?? [];
  // const supabase = createServerComponentClient<Database>({ cookies });
  // const user = await supabase.auth.getUser();
  // const queryProducts = supabase
  //   .from('produk')
  //   .select(
  //     'id, id_toko, nama, jenis, harga_beli, harga_jual, foto1, foto2, foto3, satuan',
  //   )
  //   .eq('id_toko', user.data.user?.id!)
  //   .order('created_at', { ascending: true });

  // if (filterJenis && filterJenis !== 'all')
  //   queryProducts.eq('jenis', decodeURI(filterJenis));
  // if (filterKeyword) queryProducts.ilike('nama', `%${filterKeyword}%`);

  // const products = await queryProducts;

  return (
    <section className="grid w-full grid-cols-1 gap-4  sm:grid-cols-2 md:grid-cols-3">
      {/* {products.data?.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))} */}
    </section>
  );
}

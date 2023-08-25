import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import ProductCard from './components/product-card';
import { cookies } from 'next/headers';

export default async function page() {
	const supabase = createServerComponentClient({ cookies });
	const user = await supabase.auth.getUser();
	const products = await supabase
		.from('produk')
		.select(
			'id, nama, jenis, harga_beli, harga_jual, foto_url1, foto_url2, foto_url3, satuan'
		)
		.eq('id_toko', user.data.user?.id)
		.order('created_at', { ascending: true });

	return (
		<section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-4 w-full'>
			{products.data?.map((product) => (
				<ProductCard product={product} key={product.id} />
			))}
		</section>
	);
}

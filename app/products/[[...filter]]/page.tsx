import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import ProductCard from '../components/product-card';
import { cookies } from 'next/headers';
import React from 'react';

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
			'id, nama, jenis, harga_beli, harga_jual, foto_url1, foto_url2, foto_url3, satuan'
		)
		.eq('id_toko', user.data.user?.id)
		.order('created_at', { ascending: true });

	if (filterJenis && filterJenis !== 'all') {
		queryProducts.eq('jenis', decodeURI(filterJenis));
	}
	if (filterKeyword) {
		queryProducts.ilike('nama', `%${filterKeyword}%`);
	}

	const products = await queryProducts;

	return (
		<section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-4 w-full'>
			{products.data?.map((product) => (
				<ProductCard product={product} key={product.id} />
			))}
		</section>
	);
}

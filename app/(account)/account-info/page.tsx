import { Separator } from '@/components/ui/separator';
import StoreForm from './components/store-form';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function page() {
	const supabase = createServerComponentClient<Database>({ cookies });
	const user = await supabase.auth.getUser();
	const store = await supabase
		.from('toko')
		.select('nama_toko, kabupaten, kecamatan, desa, alamat, foto_url')
		.eq('id', user.data.user?.id)
		.single();

	return (
		<main className='space-y-6'>
			<div>
				<h3 className='text-lg font-medium'>Data Toko</h3>
				<p className='text-sm text-muted-foreground'>
					Data toko akan ditampilkan bagi pembeli dan publik.
				</p>
			</div>
			<Separator />
			<StoreForm store={store.data} />
		</main>
	);
}

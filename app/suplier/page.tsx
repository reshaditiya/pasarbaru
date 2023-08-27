import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { SuplierCard } from './components/suplier-card';

export default async function page() {
	const supabase = createServerComponentClient<Database>({ cookies });
	const user = await supabase.auth.getUser();
	const supliers = await supabase
		.from('suplier')
		.select(
			'id, nama, alamat, kabupaten, kecamatan, desa, foto, email, web, no_hp'
		)
		.eq('id_toko', user.data.user?.id)
		.order('created_at', { ascending: true });

	return (
		<section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full'>
			{supliers.data?.map((suplier) => (
				<SuplierCard key={suplier.id} suplier={suplier} />
			))}
		</section>
	);
}
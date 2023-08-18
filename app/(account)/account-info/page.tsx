import { Separator } from '@/components/ui/separator';
import StoreForm from './components/store-form';

export default function page() {
	return (
		<main className='space-y-6'>
			<div>
				<h3 className='text-lg font-medium'>Data Toko</h3>
				<p className='text-sm text-muted-foreground'>
					Data toko akan ditampilkan bagi pembeli dan publik.
				</p>
			</div>
			<Separator />
			<StoreForm />
		</main>
	);
}

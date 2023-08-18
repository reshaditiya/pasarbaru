import { Separator } from '@/components/ui/separator';
import Ownerform from './components/owner-form';

export default function page() {
	return (
		<main className='space-y-6'>
			<div>
				<h3 className='text-lg font-medium'>Data Pemilik</h3>
				<p className='text-sm text-muted-foreground'>
					Data pemilik bersifat privat dan hanya digunakan untuk kebutuhan
					internal.
				</p>
			</div>
			<Separator />
			<Ownerform />
		</main>
	);
}

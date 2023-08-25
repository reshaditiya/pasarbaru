import withAuth from '@/components/account/with-auth';
import SidebarNav from './components/sidebar-nav';
import { Separator } from '@/components/ui/separator';

export default function ProductsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return withAuth(
		<div className='space-y-4 p-10 pb-16'>
			<div>
				<h2 className='text-xl font-bold tracking-tight'>Produk</h2>
			</div>
			<Separator className='my-6' />
			<div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
				<aside className='lg:w-1/5'>
					<SidebarNav />
				</aside>
				{children}
			</div>
		</div>
	);
}

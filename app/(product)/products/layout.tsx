import withAuth from '@/components/account/with-auth';
import SidebarNav from './components/sidebar-nav';

export default function ProductsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return withAuth(
		<div className='space-y-6 p-10 pb-16'>
			<div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
				<aside className='-mx-4 lg:w-1/5'>
					<SidebarNav />
				</aside>
				{children}
			</div>
		</div>
	);
}

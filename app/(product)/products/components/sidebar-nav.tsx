'use client';

import { NewProductButton } from './new-product-button';

export default function SidebarNav() {
	return (
		<nav className='flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1'>
			<NewProductButton />
		</nav>
	);
}

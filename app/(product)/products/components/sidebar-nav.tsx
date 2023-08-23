'use client';

import { ProductFormButton } from './product-form-button';

export default function SidebarNav() {
	return (
		<nav className='flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1'>
			<ProductFormButton type='new' />
		</nav>
	);
}

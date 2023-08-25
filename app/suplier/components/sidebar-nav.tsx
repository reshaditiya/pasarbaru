'use client';

import { SuplierFormButton } from './suplier-form-button';

export default function SidebarNav() {
	return (
		<nav className='flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1'>
			<SuplierFormButton type='new' />
		</nav>
	);
}

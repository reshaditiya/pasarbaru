import { MainNavItem, SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
	name: 'Pasar Baru',
	description: 'Pasar online terlengkap didukung oleh UMKM lokal.',
	url: 'https://tx.shadcn.com',
	ogImage: 'https://tx.shadcn.com/og.jpg',
	links: {
		twitter: 'https://twitter.com/shadcn',
		github: 'https://github.com/shadcn/taxonomy',
	},
};

export const navItems: MainNavItem[] = [{ title: 'Produk', href: '/products' }];

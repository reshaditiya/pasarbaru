export const siteConfig = {
  name: 'Pasar Baru',
  description: 'Pasar online terlengkap didukung oleh UMKM lokal.',
  url: 'https://tx.shadcn.com',
  ogImage: 'https://tx.shadcn.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/shadcn',
    github: 'https://github.com/shadcn/taxonomy',
  },
} as const;

export const navItems = [
  { label: 'Produk', href: '/product' },
  { label: 'Suplier', href: '/suplier' },
];

export const imageCompressOptions = {
  maxSizeMB: 0.1,
  maxWidthOrHeight: 400,
  useWebWorker: true,
  fileType: 'image/jpeg',
} as const;

export const siteSource = {
  site: 'https://fpycsvlrozkqypfoyrlu.supabase.co',
  getProductImg: function (loc: string | null) {
    if (!loc) return '';
    return `${this.site}/storage/v1/object/public/products/${loc}`;
  },
} as const;

export const fileValidation = {
  img: {
    type: new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
    size: 2 * 1024 * 1024,
  },
} as const;

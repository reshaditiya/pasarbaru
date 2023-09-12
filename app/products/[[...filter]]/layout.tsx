import Authenticated from '@/components/authenticated';
import SidebarProduct from '@/components/products/sidebar-product';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Authenticated>
      <div className="space-y-4 p-5 pb-16 md:p-10">
        <h2 className="text-xl font-bold tracking-tight">Produk</h2>
        <div className="flex flex-col lg:flex-row">
          <aside className="lg:w-1/4">
            <SidebarProduct />
          </aside>
          {children}
        </div>
      </div>
    </Authenticated>
  );
}

import Authenticated from '@/components/authenticated';
import SidebarSuplier from '@/components/suplier/sidebar-suplier';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Authenticated>
      <div className="space-y-4 p-5 pb-16 md:p-10">
        <h2 className="text-xl font-bold tracking-tight">Suplier</h2>
        <div className="flex flex-col lg:flex-row">
          <aside className="lg:w-1/4">
            <SidebarSuplier />
          </aside>
          {children}
        </div>
      </div>
    </Authenticated>
  );
}

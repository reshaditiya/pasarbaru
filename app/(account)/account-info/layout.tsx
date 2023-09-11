import { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import Authenticated from '@/components/authenticated';
import SidebarNav from '@/components/account-info/sidebar-nav';

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.',
};

const sidebarNavItems = [
  {
    title: 'Data Toko',
    href: '/account-info',
  },
  {
    title: 'Data Pemilik',
    href: '/account-info/owner',
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <Authenticated>
      <div className="space-y-6 p-5 pb-16 md:p-10">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Pengaturan</h2>
          <p className="text-muted-foreground">
            Kelola data akun dan toko anda.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/4">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
      <span></span>
    </Authenticated>
  );
}

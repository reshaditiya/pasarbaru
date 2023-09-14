import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Database } from '@/types/supabase';
import { User } from 'lucide-react';
import { cookies } from 'next/headers';
import LogoutButton from './logout-button';

export const dynamic = 'force-dynamic';

export default async function UserAccountNav({
  className,
}: {
  className: string;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const authUser = await supabase.auth.getUser();
  const { data: userData, error } = await supabase
    .from('toko')
    .select('nama_toko, email, foto')
    .eq('id', authUser.data.user?.id!)
    .single();

  if (error) throw error.message;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <Avatar className="inline-block h-10 w-10 overflow-hidden rounded-full">
          <AvatarImage src={userData?.foto} alt={userData?.nama_toko ?? ''} />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {userData?.nama_toko && (
              <p className="font-medium">{userData.nama_toko}</p>
            )}
            {userData?.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {userData.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/account-info" className="cursor-pointer">
            Pengaturan
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton className="w-full cursor-pointer bg-destructive/10 text-destructive hover:bg-destructive/20" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

'use client';

import Link from 'next/link';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from './ui/avatar';
import { User } from '@/components/icon/phospor';
import { useRouter } from 'next/navigation';

export default function UserAccountNav() {
	const router = useRouter();
	const supabase = createClientComponentClient<Database>();
	const [userData, setUserData] = useState<
		| {
				nama_toko: string | null;
				email: string | null;
				foto_url: string | null;
		  }
		| undefined
	>(undefined);

	useEffect(() => {
		async function getUserData() {
			const authUser = await supabase.auth.getUser();
			supabase
				.from('toko')
				.select('nama_toko, email, foto_url')
				.eq('id', authUser.data.user?.id)
				.single()
				.then((res) => {
					if (res.data) setUserData(res.data);
				});
		}

		getUserData();
	}, [supabase]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className='w-10 h-10 rounded-full overflow-hidden inline-block'>
					<AvatarImage
						src={userData?.foto_url ?? ''}
						alt={userData?.nama_toko ?? ''}
					/>
					<AvatarFallback>
						<User className='w-4 h-4' />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<div className='flex items-center justify-start gap-2 p-2'>
					<div className='flex flex-col space-y-1 leading-none'>
						{userData?.nama_toko && (
							<p className='font-medium'>{userData.nama_toko}</p>
						)}
						{userData?.email && (
							<p className='w-[200px] truncate text-sm text-muted-foreground'>
								{userData.email}
							</p>
						)}
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href='/account-info'>Pengaturan</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='cursor-pointer'
					onSelect={(event) => {
						event.preventDefault();
						supabase.auth.signOut().then(router.refresh);
					}}
				>
					Keluar
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

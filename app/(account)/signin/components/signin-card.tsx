'use client';

import { Button } from '@/components/ui/button';
import { FacebookLogo, GoogleLogo } from '@/components/icon/phospor';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function SignInCard() {
	const supabase = createClientComponentClient();

	async function handleSignin({
		provider,
	}: {
		provider: 'google' | 'facebook';
	}) {
		await supabase.auth.signInWithOAuth({
			provider: provider,
			options: {
				redirectTo: 'http://localhost:3000/auth/callback',
			},
		});
	}
	async function handleSignout() {
		await supabase.auth.signOut();
	}

	return (
		<Card className='max-w-md'>
			<CardHeader className='space-y-1'>
				<CardTitle className='text-2xl'>Selamat Datang di Pasar Baru</CardTitle>
				<CardDescription>
					Silahkan login melalui layanan yang tersedia untuk mengakses aplikasi.
				</CardDescription>
			</CardHeader>
			<CardContent className='flex gap-4 flex-wrap'>
				<Button
					variant='outline'
					onClick={() => handleSignin({ provider: 'google' })}
				>
					<GoogleLogo className='mr-2 h-4 w-4' weight='bold' />
					Google
				</Button>
				<Button
					variant='outline'
					onClick={() => handleSignin({ provider: 'facebook' })}
				>
					<FacebookLogo className='mr-2 h-4 w-4' weight='bold' />
					Facebook
				</Button>
			</CardContent>
		</Card>
	);
}

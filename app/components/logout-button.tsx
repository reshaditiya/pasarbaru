'use client';

import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
	const supabase = createClientComponentClient<Database>();
	const router = useRouter();

	async function handleSignout() {
		await supabase.auth.signOut();
		router.refresh();
	}

	return <Button onClick={handleSignout}>Logout</Button>;
}

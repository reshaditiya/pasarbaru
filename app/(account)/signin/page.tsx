import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import SignInCard from './components/signin-card';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function page() {
	const supabase = createServerComponentClient<Database>({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session) redirect('/');
	return (
		<main className='flex justify-center items-center h-screen'>
			<SignInCard />
		</main>
	);
}

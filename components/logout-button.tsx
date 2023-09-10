'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  return (
    <Button
      onClick={() => supabase.auth.signOut().then(router.refresh)}
      className={className}
      variant="destructive"
      size="sm"
    >
      Keluar
    </Button>
  );
}

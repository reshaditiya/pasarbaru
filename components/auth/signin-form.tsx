'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { cn } from '@/lib/utils';

export default function SigninForm({ className }: { className?: string }) {
  const supabase = createClientComponentClient();
  async function handleSignin({
    provider,
  }: {
    provider: 'google' | 'facebook';
  }) {
    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  return (
    <Card className={cn('max-w-md', className)}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Selamat Datang di Pasar Baru</CardTitle>
        <CardDescription>
          Silahkan login melalui layanan yang tersedia untuk mengakses aplikasi.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        <Button
          variant="outline"
          onClick={() => handleSignin({ provider: 'google' })}
        >
          Google
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSignin({ provider: 'facebook' })}
        >
          Facebook
        </Button>
      </CardContent>
    </Card>
  );
}

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect, useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import type { Database } from '@/types/supabase';

const storeFormSchema = z.object({
  nama_pemilik: z
    .string()
    .min(4, {
      message: 'Nama pemilik harus lebih dari 4 karakter',
    })
    .max(20, {
      message: 'Nama pemilik tidak boleh lebih dari 20 karakter',
    }),
  email: z.string().min(4, {
    message: 'Email harus lebih dari 4 karakter',
  }),
  no_hp: z
    .string()
    .min(4, {
      message: 'No hp harus lebih dari 4 karakter',
    })
    .max(15, {
      message: 'No hp tidak boleh lebih dari 15 karakter',
    }),
});

type ProfileFormValues = z.infer<typeof storeFormSchema>;

type OwnerFormProps = {
  owner: {
    nama_pemilik: string | null;
    email: string | null;
    no_hp: string | null;
  } | null;
};

export default function OwnerForm({ owner }: OwnerFormProps) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const defaultValues: Partial<ProfileFormValues> = {
    nama_pemilik: owner?.nama_pemilik ?? '',
    email: owner?.email ?? '',
    no_hp: owner?.no_hp ?? '',
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(storeFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: ProfileFormValues) {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) redirect('/signin');
    const { error } = await supabase
      .from('toko')
      .update({ nama_pemilik: data.nama_pemilik, no_hp: data.no_hp })
      .eq('id', userData.user?.id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Data Gagal Disimpan!',
        description: 'Terjadi kesalahan saat menyimpan data silahkan coba lagi',
        action: <ToastAction altText="Coba Lagi">Coba Lagi</ToastAction>,
      });
    } else {
      toast({
        description: 'Data pemilik toko berhasil diperbarui!',
      });
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nama_pemilik"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Pemilik</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="no_hp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No Hp</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Simpan</Button>
      </form>
    </Form>
  );
}

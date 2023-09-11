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
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect, useRouter } from 'next/navigation';
import { ToastAction } from '@/components/ui/toast';
import type { Database } from '@/types/supabase';

const storeFormSchema = z.object({
  nama_toko: z
    .string()
    .min(4, {
      message: 'Nama toko harus lebih dari 4 karakter',
    })
    .max(20, {
      message: 'Nama toko tidak boleh lebih dari 20 karakter',
    }),
  foto: z.string().optional(),
  kabupaten: z
    .string()
    .min(4, {
      message: 'Kabupaten harus lebih dari 4 karakter',
    })
    .max(20, {
      message: 'Kabupaten tidak boleh lebih dari 20 karakter',
    }),
  kecamatan: z
    .string()
    .min(4, {
      message: 'Kecamatan harus lebih dari 4 karakter',
    })
    .max(20, {
      message: 'Kecamatan tidak boleh lebih dari 20 karakter',
    }),
  desa: z
    .string()
    .min(4, {
      message: 'Desa harus lebih dari 4 karakter',
    })
    .max(20, {
      message: 'Desa tidak boleh lebih dari 20 karakter',
    }),
  alamat: z
    .string()
    .min(4, {
      message: 'Desa harus lebih dari 5 karakter',
    })
    .max(20, {
      message: 'Desa tidak boleh lebih dari 20 karakter',
    }),
});

type StoreFormValues = z.infer<typeof storeFormSchema>;

type StoreFormProps = {
  store: {
    nama_toko: string | null;
    kabupaten: string | null;
    kecamatan: string | null;
    desa: string | null;
    alamat: string | null;
    foto: string | null;
  } | null;
};

export default function StoreForm({ store }: StoreFormProps) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const defaultValues: Partial<StoreFormValues> = {
    nama_toko: store?.nama_toko ?? '',
    kabupaten: store?.kabupaten ?? '',
    kecamatan: store?.kecamatan ?? '',
    desa: store?.desa ?? '',
    alamat: store?.alamat ?? '',
    foto: '',
  };

  const form = useForm<StoreFormValues>({
    resolver: zodResolver(storeFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: StoreFormValues) {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) redirect('/signin');
    const { error } = await supabase
      .from('toko')
      .update({
        nama_toko: data.nama_toko,
        kabupaten: data.kabupaten,
        kecamatan: data.kecamatan,
        desa: data.desa,
        alamat: data.alamat,
        foto: data.foto,
      })
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
        description: 'Data toko berhasil diperbarui!',
      });
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nama_toko"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Toko</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="foto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto</FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kabupaten"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kabupaten</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kecamatan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kecamatan</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desa</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alamat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Textarea {...field} />
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

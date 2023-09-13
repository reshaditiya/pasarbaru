'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ToastAction } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { fileValidation } from '@/config/site';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { useWindowSize } from '@uidotdev/usehooks';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';

const newSuplierSchema = z.object({
  nama: z
    .string()
    .min(4, {
      message: 'Nama harus lebih dari 4 karakter',
    })
    .max(20, {
      message: 'Nama tidak boleh lebih dari 20 karakter',
    }),
  alamat: z
    .string()
    .min(5, {
      message: 'Alamat harus lebih dari 5 karakter',
    })
    .max(40, {
      message: 'Alamat tidak boleh lebih dari 40 karakter',
    }),
  kabupaten: z
    .string()
    .min(5, {
      message: 'Kabupaten harus lebih dari 5 karakter',
    })
    .max(30, {
      message: 'Kabupaten tidak boleh lebih dari 30 karakter',
    }),
  kecamatan: z
    .string()
    .min(5, {
      message: 'Kecamatan harus lebih dari 5 karakter',
    })
    .max(30, {
      message: 'Kecamatan tidak boleh lebih dari 30 karakter',
    }),
  desa: z
    .string()
    .min(5, {
      message: 'Kecamatan harus lebih dari 10 karakter',
    })
    .max(30, {
      message: 'Kecamatan tidak boleh lebih dari 30 karakter',
    }),
  foto: z
    .any()
    .refine((file) => {
      return fileValidation.img.type.has(file[0]?.type);
    }, 'File harus berupa gambar')
    .refine(
      (file) => {
        return file[0]?.size < fileValidation.img.size;
      },
      `File harus kurang dari ${fileValidation.img.size / 100000}`,
    )
    .optional()
    .or(z.literal('')),
  no_hp: z
    .string()
    .min(12, {
      message: 'No hp harus lebih dari 12 karakter',
    })
    .max(16, {
      message: 'No hp tidak boleh lebih dari 16 karakter',
    }),
  email: z
    .string()
    .email({
      message: 'Email tidak valid',
    })
    .min(6, {
      message: 'Email harus lebih dari 6 karakter',
    })
    .max(20, {
      message: 'Email tidak boleh lebih dari 20 karakter',
    })
    .optional(),
  web: z.string().optional(),
});

type NewSuplierValues = z.infer<typeof newSuplierSchema>;

export function SuplierFormButton({
  type,
  suplierValues,
  suplierId,
}: {
  type: 'new' | 'edit';
  suplierValues?: {
    nama: string;
    alamat: string;
    kabupaten: string;
    kecamatan: string;
    desa: string;
    foto: string | null;
    email: string | null;
    web: string | null;
    no_hp: string;
  };
  suplierId?: number;
}) {
  const windowSize = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const defaultValues: Partial<NewSuplierValues> = {
    nama: suplierValues?.nama ?? '',
    alamat: suplierValues?.alamat ?? '',
    kabupaten: suplierValues?.kabupaten ?? '',
    kecamatan: suplierValues?.kecamatan ?? '',
    desa: suplierValues?.desa ?? '',
    foto: suplierValues?.foto ?? '',
    no_hp: suplierValues?.no_hp ?? '',
    email: suplierValues?.email ?? '',
    web: suplierValues?.web ?? '',
  };

  const form = useForm<NewSuplierValues>({
    resolver: zodResolver(newSuplierSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: NewSuplierValues) {
    const user = await supabase.auth.getUser();
    let dbRes = undefined;

    if (type === 'new') {
      dbRes = await supabase
        .from('suplier')
        .insert([
          {
            id_toko: user.data.user?.id,
            nama: data.nama,
            alamat: data.alamat,
            kabupaten: data.kabupaten,
            kecamatan: data.kecamatan,
            desa: data.desa,
            no_hp: data.no_hp,
            email: data.email,
            web: data.web,
          },
        ])
        .select()
        .single();

      if (dbRes?.data) {
        const { data: dbFoto } = await supabase.storage
          .from('suplier')
          .upload(`${user.data.user?.id}/${dbRes.data.id}_1.jpg`, data.foto, {
            cacheControl: '3600',
            upsert: false,
          });

        dbRes = await supabase
          .from('suplier')
          .update({
            foto: dbFoto,
          })
          .eq('id', dbRes.data.id);
      }
    } else {
      dbRes = await supabase
        .from('suplier')
        .update({
          nama: data.nama,
          alamat: data.alamat,
          kabupaten: data.kabupaten,
          kecamatan: data.kecamatan,
          desa: data.desa,
          foto: data.foto,
          no_hp: data.no_hp,
          email: data.email,
          web: data.web,
        })
        .eq('id', suplierId);
    }

    if (dbRes?.error) {
      toast({
        variant: 'destructive',
        title: 'Data Gagal Disimpan!',
        description: 'Terjadi kesalahan saat menyimpan data silahkan coba lagi',
        action: (
          <ToastAction
            altText="Coba Lagi"
            onClick={form.handleSubmit(onSubmit)}
          >
            Coba Lagi
          </ToastAction>
        ),
      });
    } else {
      toast({
        description: 'Data produk berhasil disimpan!',
      });
      if (type === 'new') form.reset();
      router.refresh();
      setIsOpen(false);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {type === 'new' ? (
          <Button variant="default">
            <Plus className="mr-2 h-4 w-4" />
            Suplier Baru
          </Button>
        ) : (
          <Button variant="secondary">Edit</Button>
        )}
      </SheetTrigger>
      <SheetContent
        className="h-full md:min-w-max"
        side={windowSize.width! > 768 ? 'right' : 'bottom'}
      >
        <ScrollArea className="h-full">
          {/* scroll area safe container */}
          <div className="px-4">
            <SheetHeader>
              <SheetTitle>Suplier Baru</SheetTitle>
              <SheetDescription>
                Tambahkan suplier untuk transaksi toko.
              </SheetDescription>
              <Separator />
            </SheetHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-4 flex flex-col gap-4 md:grid md:grid-cols-2"
              >
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>No HP</FormLabel>
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
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="web"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Web</FormLabel>
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
                        <Input
                          type="file"
                          {...field}
                          className="text-right"
                          value={field.value.filename}
                          onChange={(event) => {
                            return field.onChange(event.target.files);
                          }}
                        />
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
                    <FormItem className="col-span-2">
                      <FormLabel>Alamat</FormLabel>
                      <FormControl>
                        <Textarea className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SheetFooter className="col-start-2 mt-4">
                  <Button type="submit">Simpan</Button>
                </SheetFooter>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

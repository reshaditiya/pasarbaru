'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
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
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { jenis } from '@/config/product';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ToastAction } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { imageCompressOptions } from '@/config/site';
import imageCompression from 'browser-image-compression';
import { UserResponse } from '@supabase/supabase-js';
import { fileValidation } from '@/config/site';
import { InputImg } from '@/components/input-img';
import { Database } from '@/types/supabase';
import { Plus } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useWindowSize } from '@uidotdev/usehooks';

const newProductSchema = z.object({
  nama: z
    .string()
    .min(4, {
      message: 'Nama produk harus lebih dari 4 karakter',
    })
    .max(20, {
      message: 'Nama toko tidak boleh lebih dari 20 karakter',
    }),
  foto1: z
    .any()
    .refine((file) => {
      if (typeof file === 'string' && file !== '') return true;
      return fileValidation.img.type.has(file[0]?.type);
    }, 'File harus berupa gambar')
    .refine(
      (file) => {
        if (typeof file === 'string' && file !== '') return true;
        return file[0]?.size < fileValidation.img.size;
      },
      `File harus kurang dari ${fileValidation.img.size / 100000}`,
    ),
  foto2: z
    .any()
    .refine((file) => {
      if (typeof file === 'string' && file !== '') return true;
      return fileValidation.img.type.has(file[0]?.type);
    }, 'File harus berupa gambar')
    .refine(
      (file) => {
        if (typeof file === 'string' && file !== '') return true;
        return file[0]?.size < fileValidation.img.size;
      },
      `File harus kurang dari ${fileValidation.img.size / 100000}`,
    )
    .optional()
    .or(z.literal('')),
  foto3: z
    .any()
    .refine((file) => {
      if (typeof file === 'string' && file !== '') return true;
      return fileValidation.img.type.has(file[0]?.type);
    }, 'File harus berupa gambar')
    .refine(
      (file) => {
        if (typeof file === 'string' && file !== '') return true;
        return file[0]?.size < fileValidation.img.size;
      },
      `File harus kurang dari ${fileValidation.img.size / 100000}`,
    )
    .optional()
    .or(z.literal('')),
  jenis: z.string(),
  satuan: z
    .string()
    .min(4, {
      message: 'Satuan produk harus lebih dari 4 karakter',
    })
    .max(20, {
      message: 'Satuan produk tidak boleh lebih dari 20 karakter',
    }),
  harga_beli: z.coerce.number(),
  harga_jual: z.coerce.number(),
});

type NewProductValues = z.infer<typeof newProductSchema>;

type ProductFormButtonProps = {
  type: 'new' | 'edit';
  productValues?: {
    nama: string;
    jenis: string;
    satuan: string;
    harga_beli: number;
    harga_jual: number;
    foto1: string | null;
    foto2: string | null;
    foto3: string | null;
  };
  productId?: number;
};

export function ProductFormButton({
  type,
  productValues,
  productId,
}: ProductFormButtonProps) {
  const windowSize = useWindowSize();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const defaultValues: Partial<NewProductValues> = {
    nama: productValues?.nama ?? '',
    foto1: productValues?.foto1 ?? '',
    foto2: productValues?.foto2 ?? '',
    foto3: productValues?.foto3 ?? '',
    jenis: productValues?.jenis ?? jenis[0],
    satuan: productValues?.satuan ?? '',
    harga_beli: productValues?.harga_beli ?? 0,
    harga_jual: productValues?.harga_jual ?? 0,
  };

  const form = useForm<NewProductValues>({
    resolver: zodResolver(newProductSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function uploadPhotos({
    user,
    productId,
    foto1,
    foto2,
    foto3,
  }: {
    user: UserResponse;
    productId: number;
    foto1: File | false;
    foto2: File | false;
    foto3: File | false;
  }) {
    let dbFoto1 = undefined;
    let dbFoto2 = undefined;
    let dbFoto3 = undefined;

    if (foto1) {
      const { data } = await supabase.storage
        .from('products')
        .upload(`${user.data.user?.id}/${productId}_1.jpg`, foto1, {
          cacheControl: '3600',
          upsert: false,
        });
      dbFoto1 = data;
    }
    if (foto2) {
      const { data } = await supabase.storage
        .from('products')
        .upload(`${user.data.user?.id}/${productId}_2.jpg`, foto2, {
          cacheControl: '3600',
          upsert: false,
        });

      dbFoto2 = data;
    }
    if (foto3) {
      const { data } = await supabase.storage
        .from('products')
        .upload(`${user.data.user?.id}/${productId}_3.jpg`, foto3, {
          cacheControl: '3600',
          upsert: false,
        });

      dbFoto3 = data;
    }

    return { dbFoto1, dbFoto2, dbFoto3 };
  }

  async function updatePhotos({
    user,
    productId,
    foto1,
    foto2,
    foto3,
  }: {
    user: UserResponse;
    productId: number;
    foto1: File | false;
    foto2: File | false;
    foto3: File | false;
  }) {
    let dbFoto1 = undefined;
    let dbFoto2 = undefined;
    let dbFoto3 = undefined;

    if (foto1) {
      const { data } = await supabase.storage
        .from('products')
        .update(`${user.data.user?.id}/${productId}_1.jpg`, foto1, {
          cacheControl: '3600',
          upsert: true,
        });

      dbFoto1 = data;
    }
    if (foto2) {
      const { data } = await supabase.storage
        .from('products')
        .update(`${user.data.user?.id}/${productId}_2.jpg`, foto2, {
          cacheControl: '3600',
          upsert: true,
        });

      dbFoto2 = data;
    } else {
      const { data } = await supabase.storage
        .from('products')
        .remove([`${user.data.user?.id}/${productId}_2.jpg`]);

      dbFoto2 = data;
    }

    if (foto3) {
      const { data } = await supabase.storage
        .from('products')
        .update(`${user.data.user?.id}/${productId}_3.jpg`, foto3, {
          cacheControl: '3600',
          upsert: true,
        });

      dbFoto3 = data;
    } else {
      const { data } = await supabase.storage
        .from('products')
        .remove([`${user.data.user?.id}/${productId}_3.jpg`]);

      dbFoto3 = data;
    }

    return { dbFoto1, dbFoto2, dbFoto3 };
  }

  async function onSubmit(data: NewProductValues) {
    const user = await supabase.auth.getUser();
    let dbRes = undefined;
    const foto1 =
      typeof data.foto1 !== 'string' &&
      (await imageCompression(data.foto1[0], imageCompressOptions));
    const foto2 =
      typeof data.foto2 !== 'string' &&
      (await imageCompression(data.foto2[0], imageCompressOptions));
    const foto3 =
      typeof data.foto3 !== 'string' &&
      (await imageCompression(data.foto3[0], imageCompressOptions));

    if (type === 'new') {
      dbRes = await supabase
        .from('produk')
        .insert([
          {
            nama: data.nama,
            jenis: data.jenis,
            id_toko: user.data.user?.id!,
            satuan: data.satuan,
            harga_beli: data.harga_beli,
            harga_jual: data.harga_jual,
          },
        ])
        .select()
        .single();

      if (dbRes.data) {
        const { dbFoto1, dbFoto2, dbFoto3 } = await uploadPhotos({
          user,
          productId: dbRes.data.id,
          foto1,
          foto2,
          foto3,
        });

        dbRes = await supabase
          .from('produk')
          .update({
            foto1: dbFoto1?.path,
            foto2: dbFoto2?.path,
            foto3: dbFoto3?.path,
          })
          .eq('id', dbRes.data.id);
      }
    } else {
      if (productId) {
        await updatePhotos({
          user,
          productId: productId,
          foto1,
          foto2,
          foto3,
        });

        dbRes = await supabase
          .from('produk')
          .update({
            nama: data.nama,
            jenis: data.jenis,
            satuan: data.satuan,
            harga_beli: data.harga_beli,
            harga_jual: data.harga_jual,
          })
          .eq('id', productId);
      }
    }

    if (dbRes?.error) {
      toast({
        variant: 'destructive',
        title: 'Data Gagal Disimpan!',
        description: 'Terjadi kesalahan saat menyimpan data silahkan coba lagi',
        action: <ToastAction altText="Coba Lagi">Coba Lagi</ToastAction>,
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
            Produk Baru
          </Button>
        ) : (
          <Button variant="secondary">Edit</Button>
        )}
      </SheetTrigger>
      <SheetContent
        className="h-full sm:max-w-2xl"
        side={windowSize.width! > 768 ? 'right' : 'bottom'}
      >
        <SheetHeader>
          <SheetTitle>Produk Baru</SheetTitle>
          <SheetDescription>
            Buat produk baru untuk ditampilkan di toko kamu.
          </SheetDescription>
          <Separator />
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 grid grid-cols-3 gap-4"
          >
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem className="col-span-3 md:col-span-2">
                  <FormLabel>Nama Produk</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foto1"
              render={({ field }) => (
                <FormItem className="col-start-1">
                  <FormLabel>Foto 1</FormLabel>
                  <FormControl>
                    <InputImg id="foto1" field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foto2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto 2</FormLabel>
                  <FormControl>
                    <InputImg id="foto2" field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foto3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto 3</FormLabel>
                  <FormControl>
                    <InputImg id="foto3" field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jenis"
              render={({ field }) => (
                <FormItem className="col-span-3 md:col-span-2">
                  <FormLabel>Jenis</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis produk" />
                      </SelectTrigger>
                      <SelectContent>
                        {jenis.map((jn) => (
                          <SelectItem key={jn} value={jn}>
                            {jn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="harga_beli"
              render={({ field }) => (
                <FormItem className="col-start-1">
                  <FormLabel>Harga Beli</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" className="text-right" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="harga_jual"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga Jual</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" className="text-right" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="satuan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Satuan</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="col-start-3 items-end">
              <Button type="submit">Simpan</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

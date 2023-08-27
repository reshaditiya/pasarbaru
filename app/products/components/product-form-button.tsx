'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
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
import { Plus } from '@/components/icon/phospor';
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

const newProductSchema = z.object({
	nama: z
		.string()
		.min(4, {
			message: 'Nama produk harus lebih dari 4 karakter',
		})
		.max(20, {
			message: 'Nama toko tidak boleh lebih dari 20 karakter',
		}),
	foto_url1: z.string().optional(),
	foto_url2: z.string().optional(),
	foto_url3: z.string().optional(),
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

export function ProductFormButton({
	type,
	productValues,
	productId,
}: {
	type: 'new' | 'edit';
	productValues?: {
		nama: string;
		jenis: string;
		satuan: string;
		harga_beli: number;
		harga_jual: number;
		foto_url1: string | null;
		foto_url2: string | null;
		foto_url3: string | null;
	};
	productId?: number;
}) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const router = useRouter();
	const supabase = createClientComponentClient();
	const defaultValues: Partial<NewProductValues> = {
		nama: productValues?.nama ?? '',
		foto_url1: productValues?.foto_url1 ?? '',
		foto_url2: productValues?.foto_url2 ?? '',
		foto_url3: productValues?.foto_url3 ?? '',
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

	async function onSubmit(data: NewProductValues) {
		const user = await supabase.auth.getUser();
		let dbRes = undefined;

		if (type === 'new') {
			dbRes = await supabase.from('produk').insert([
				{
					nama: data.nama,
					jenis: data.jenis,
					id_toko: user.data.user?.id,
					satuan: data.satuan,
					harga_beli: data.harga_beli,
					harga_jual: data.harga_jual,
				},
			]);
		} else {
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

		if (dbRes?.error) {
			toast({
				variant: 'destructive',
				title: 'Data Gagal Disimpan!',
				description: 'Terjadi kesalahan saat menyimpan data silahkan coba lagi',
				action: <ToastAction altText='Coba Lagi'>Coba Lagi</ToastAction>,
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
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				{type === 'new' ? (
					<Button variant='default'>
						<Plus weight='bold' className='mr-2 h-4 w-4' />
						Produk Baru
					</Button>
				) : (
					<Button variant='secondary'>Edit</Button>
				)}
			</DialogTrigger>
			<DialogContent className='sm:max-w-2xl'>
				<DialogHeader>
					<DialogTitle>Produk Baru</DialogTitle>
					<DialogDescription>
						Buat produk baru untuk ditampilkan di toko kamu.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='grid grid-cols-3 gap-4'
					>
						<FormField
							control={form.control}
							name='nama'
							render={({ field }) => (
								<FormItem className='col-span-2'>
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
							name='foto_url1'
							render={({ field }) => (
								<FormItem className='col-start-1'>
									<FormLabel>Foto 1</FormLabel>
									<FormControl>
										<Input type='file' {...field} className='w-full h-24' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='foto_url2'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Foto 2</FormLabel>
									<FormControl>
										<Input type='file' {...field} className='w-full h-24' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='foto_url3'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Foto 3</FormLabel>
									<FormControl>
										<Input type='file' {...field} className='w-full h-24' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='jenis'
							render={({ field }) => (
								<FormItem className='col-span-2'>
									<FormLabel>Jenis</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger>
												<SelectValue placeholder='Pilih jenis produk' />
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
							name='harga_beli'
							render={({ field }) => (
								<FormItem className='col-start-1'>
									<FormLabel>Harga Beli</FormLabel>
									<FormControl>
										<Input {...field} type='number' className='text-right' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='harga_jual'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Harga Jual</FormLabel>
									<FormControl>
										<Input {...field} type='number' className='text-right' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='satuan'
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
						<DialogFooter className='col-start-3'>
							<Button type='submit'>Simpan</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

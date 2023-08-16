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

type ProfileFormValues = z.infer<typeof storeFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
	// bio: 'I own a computer.',
	// urls: [
	// 	{ value: 'https://shadcn.com' },
	// 	{ value: 'http://twitter.com/shadcn' },
	// ],
};

export default function StoreForm() {
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(storeFormSchema),
		defaultValues,
		mode: 'onChange',
	});

	function onSubmit(data: ProfileFormValues) {
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
					<code className='text-white'>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='nama_toko'
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
					name='foto'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Foto</FormLabel>
							<FormControl>
								<Input type='file' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='kabupaten'
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
					name='kecamatan'
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
					name='desa'
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
					name='alamat'
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
				<Button type='submit'>Simpan</Button>
			</form>
		</Form>
	);
}

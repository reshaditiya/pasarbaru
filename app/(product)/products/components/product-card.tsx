import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import ImagePlaceHolder from '@/public/image-placeholder.svg';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatNumberTothousand } from '@/lib/utils';

export default function ProductCard({
	product,
}: {
	product: {
		id: number;
		nama: string;
		jenis: string;
		harga_beli: number;
		harga_jual: number;
		foto_url1: string;
	};
}) {
	return (
		<Card className='w-full'>
			<CardHeader>
				<Image src={ImagePlaceHolder} alt='product image' />
				<CardTitle>{product.nama}</CardTitle>
				<CardDescription>{product.jenis}</CardDescription>
			</CardHeader>
			<CardContent>
				<ul className='flex flex-col gap-2'>
					<li className='flex justify-between'>
						<span>Harga Beli:</span>
						<span>{formatNumberTothousand(product.harga_beli)}</span>
					</li>
					<li className='flex justify-between'>
						<span>Harga Jual:</span>
						<span>{formatNumberTothousand(product.harga_jual)}</span>
					</li>
					<Separator />
					<li className='flex justify-between'>
						<span>Keuntungan:</span>
						<span>
							{formatNumberTothousand(product.harga_jual - product.harga_beli)}
						</span>
					</li>
				</ul>
			</CardContent>
			<CardFooter className='flex gap-4 justify-end'>
				<Button
					variant='ghost'
					className='text-red-800 hover:text-red-800 hover:bg-red-50'
				>
					Hapus
				</Button>
				<Button variant='secondary'>Edit</Button>
			</CardFooter>
		</Card>
	);
}

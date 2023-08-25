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
import { Separator } from '@/components/ui/separator';
import { formatNumberTothousand } from '@/lib/utils';
import DeleteProductButton from './delete-product-button';
import { ProductFormButton } from './product-form-button';

export default function ProductCard({
	product,
}: {
	product: {
		id: number;
		nama: string;
		jenis: string;
		satuan: string;
		harga_beli: string;
		harga_jual: string;
		foto_url1: string;
		foto_url2: string;
		foto_url3: string;
	};
}) {
	const { id: productId, ...productValues } = product;

	return (
		<Card className='w-full'>
			<CardHeader>
				<Image src={ImagePlaceHolder} alt='product image' />
				<CardTitle>{productValues.nama}</CardTitle>
				<CardDescription>{productValues.jenis}</CardDescription>
			</CardHeader>
			<CardContent>
				<ul className='flex flex-col gap-2'>
					<li className='flex justify-between'>
						<span>Harga Beli:</span>
						<span>
							{formatNumberTothousand(Number(productValues.harga_beli))}
						</span>
					</li>
					<li className='flex justify-between'>
						<span>Harga Jual:</span>
						<span>
							{formatNumberTothousand(Number(productValues.harga_jual))}
						</span>
					</li>
					<Separator />
					<li className='flex justify-between'>
						<span>Keuntungan:</span>
						<span>
							{formatNumberTothousand(
								Number(productValues.harga_jual) -
									Number(productValues.harga_beli)
							)}
						</span>
					</li>
				</ul>
			</CardContent>
			<CardFooter className='flex gap-4 justify-end flex-wrap'>
				<DeleteProductButton
					productId={productId}
					productName={productValues.nama}
				/>
				<ProductFormButton
					type='edit'
					productValues={productValues}
					productId={productId}
				/>
			</CardFooter>
		</Card>
	);
}

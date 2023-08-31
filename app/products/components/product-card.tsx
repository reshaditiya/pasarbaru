import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { formatNumberTothousand } from '@/lib/utils';
import DeleteProductButton from './delete-product-button';
import { ProductFormButton } from './product-form-button';
import { siteSource } from '@/config/site';

export default function ProductCard({
  product,
}: {
  product: {
    id: number;
    id_toko: string;
    nama: string;
    jenis: string;
    satuan: string;
    harga_beli: number;
    harga_jual: number;
    foto1: string | null;
    foto2: string | null;
    foto3: string | null;
  };
}) {
  const { id: productId, id_toko, ...productValues } = product;

  return (
    <Card className="w-full">
      <CardHeader>
        <figure className="relative h-40 w-full overflow-hidden rounded-md">
          <Image
            src={siteSource.getProductImg(productValues.foto1)}
            alt="product image"
            className="object-cover"
            fill
          />
        </figure>
        <CardTitle>{productValues.nama}</CardTitle>
        <CardDescription>{productValues.jenis}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2">
          <li className="flex justify-between">
            <span>Harga Beli:</span>
            <span>
              {formatNumberTothousand(Number(productValues.harga_beli))}
            </span>
          </li>
          <li className="flex justify-between">
            <span>Harga Jual:</span>
            <span>
              {formatNumberTothousand(Number(productValues.harga_jual))}
            </span>
          </li>
          <Separator />
          <li className="flex justify-between">
            <span>Keuntungan:</span>
            <span>
              {formatNumberTothousand(
                Number(productValues.harga_jual) -
                  Number(productValues.harga_beli),
              )}
            </span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-end gap-4">
        <DeleteProductButton
          userId={id_toko}
          productId={productId}
          productName={productValues.nama}
        />
        <ProductFormButton
          type="edit"
          productValues={productValues}
          productId={productId}
        />
      </CardFooter>
    </Card>
  );
}

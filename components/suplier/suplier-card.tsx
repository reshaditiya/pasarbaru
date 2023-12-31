import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SuplierFormButton } from './suplier-form-button';
import DeleteSuplierButton from './delete-suplier-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

export function SuplierCard({
  suplier,
}: {
  suplier: {
    id: number;
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
}) {
  const { id: suplierId, ...suplierValues } = suplier;

  return (
    <Card className="flex w-full flex-col">
      <CardHeader className="flex-row flex-wrap items-center gap-4">
        <Avatar className="inline-block h-10 w-10 overflow-hidden rounded-full">
          <AvatarImage src={suplier?.foto ?? ''} alt={suplier?.nama ?? ''} />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <CardTitle className="flex flex-wrap gap-4">
            {suplier?.nama}
          </CardTitle>
          <CardDescription>{suplier?.no_hp}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div>
            {suplier?.kabupaten} / {suplier?.kabupaten} / {suplier?.desa}
          </div>
          <div>{suplier?.alamat}</div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-1 flex-wrap items-end justify-end gap-4">
        <DeleteSuplierButton
          suplierId={suplierId}
          suplierName={suplierValues.nama}
        />
        <SuplierFormButton
          type="edit"
          suplierValues={suplierValues}
          suplierId={suplierId}
        />
      </CardFooter>
    </Card>
  );
}

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
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteProductButton({
  productId,
  userId,
  productName,
}: {
  productId: number;
  userId: string;
  productName: string;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClientComponentClient();

  async function handleDelete() {
    const { error } = await supabase
      .from('produk')
      .delete()
      .eq('id', productId);

    await supabase.storage
      .from('products')
      .remove([
        `${userId}/${productId}_1.jpg`,
        `${userId}/${productId}_2.jpg`,
        `${userId}/${productId}_3.jpg`,
      ]);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Data Gagal Dihapus!',
        description: 'Terjadi kesalahan saat menghapus data silahkan coba lagi',
        action: <ToastAction altText="Coba Lagi">Coba Lagi</ToastAction>,
      });
    } else {
      toast({
        description: 'Data produk berhasil dihapus!',
      });
      router.refresh();
      setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-red-800 hover:bg-red-50 hover:text-red-800"
        >
          Hapus
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Apakah anda yakin akan menghapus &ldquo;{productName}&rdquo;?
          </DialogTitle>
          <DialogDescription>
            Pastikan produk yang akan dihapus adalah produk yang benar, produk
            yang terhapus tidak dapat dikembalikan!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Batal
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

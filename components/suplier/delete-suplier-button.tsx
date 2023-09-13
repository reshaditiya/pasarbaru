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
import type { Database } from '@/types/supabase';

export default function DeleteSuplierButton({
  suplierId,
  suplierName,
}: {
  suplierId: number;
  suplierName: string;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClientComponentClient<Database>();

  async function handleDelete() {
    const { error } = await supabase
      .from('suplier')
      .delete()
      .eq('id', suplierId);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Data Gagal Dihapus!',
        description: 'Terjadi kesalahan saat menghapus data silahkan coba lagi',
        action: (
          <ToastAction altText="Coba Lagi" onClick={handleDelete}>
            Coba Lagi
          </ToastAction>
        ),
      });
    } else {
      toast({
        description: 'Data suplier berhasil dihapus!',
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
            Apakah anda yakin akan menghapus &ldquo;{suplierName}&rdquo;?
          </DialogTitle>
          <DialogDescription>
            Pastikan suplier yang akan dihapus adalah suplier yang benar,
            suplier yang terhapus tidak dapat dikembalikan!
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

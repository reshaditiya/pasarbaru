'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { siteConfig } from '@/config/site';
import { AlignLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { NavbarItem } from './navbar-item';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function MobileNav({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="md:hidden" asChild>
        <Button size="icon" variant="outline">
          <AlignLeft className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5" strokeWidth={2.5} />
              <span className="font-bold sm:inline-block">
                {siteConfig.name}
              </span>
            </Link>
          </SheetTitle>
          <Separator />
        </SheetHeader>
        <NavbarItem className="ml-4 mt-4" />
      </SheetContent>
    </Sheet>
  );
}

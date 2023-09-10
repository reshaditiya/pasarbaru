import {
  Sheet,
  SheetContent,
  SheetDescription,
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

export default function MobileNav({ className }: { className?: string }) {
  return (
    <Sheet>
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
        <NavbarItem variant="mobile" className="ml-4 mt-4" />
      </SheetContent>
    </Sheet>
  );
}

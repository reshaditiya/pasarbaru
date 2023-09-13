'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { jenis } from '@/config/product';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RotateCcw, Sliders } from 'lucide-react';

const FilterSchema = z.object({
  jenis: z.string(),
  keyword: z.string().optional(),
});

type FilterValues = z.infer<typeof FilterSchema>;

export function FilterProduct() {
  return (
    <>
      <FilterFormPopover className="lg:hidden" />
      <FilterFormCard className="hidden lg:block" />
    </>
  );
}

export function FilterFormPopover(
  props: React.HTMLAttributes<HTMLButtonElement>,
) {
  return (
    <Popover>
      <PopoverTrigger {...props} asChild>
        <Button variant="outline" size="icon">
          <Sliders className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="end">
        <FilterFormCard className="border-none p-0 shadow-none" />
      </PopoverContent>
    </Popover>
  );
}

export function FilterFormCard(props: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const defaultValues: Partial<FilterValues> = {
    jenis: searchParams.get('jenis') ?? 'all',
    keyword: searchParams.get('keyword') ?? '',
  };

  const form = useForm<FilterValues>({
    resolver: zodResolver(FilterSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: FilterValues) {
    const searchParams = new URLSearchParams({
      jenis: data.jenis,
      keyword: data.keyword ?? '',
    });
    const queryString = '?' + searchParams.toString();
    router.replace(queryString, { scroll: false });
  }

  function handleReset(e: any) {
    e.preventDefault();
    form.reset();
    router.replace(pathname);
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Filter Data</CardTitle>
        <Separator />
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="jenis"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Jenis</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis produk" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Jenis</SelectItem>
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
              name="keyword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cari</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            {searchParams.size > 0 && (
              <Button variant="ghost" size="icon" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
            <Button variant="secondary" type="submit">
              Terapkan
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

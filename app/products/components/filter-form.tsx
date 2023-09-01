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
import { ArrowsClockwise, Sliders } from '@/components/icon/phospor';
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
import { useRouter } from 'next/navigation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const FilterSchema = z.object({
  jenis: z.string(),
  keyword: z.string().optional(),
});

const defaultValues: Partial<FilterValues> = {
  jenis: 'all',
  keyword: '',
};

type FilterValues = z.infer<typeof FilterSchema>;

export function FilterForm() {
  return (
    <>
      <FilterFormPopover className="lg:hidden" />
      <FilterFormCard className="hidden lg:block" />
    </>
  );
}

export function FilterFormPopover({ ...props }) {
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

export function FilterFormCard({ ...props }) {
  const router = useRouter();
  const form = useForm<FilterValues>({
    resolver: zodResolver(FilterSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: FilterValues) {
    router.push(`/products/${data.jenis ?? 'all'}/${data.keyword ?? ''}`);
  }

  function handleReset(e: any) {
    e.preventDefault();
    form.reset();
    router.push('/products');
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
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
            <Button variant="ghost" size="icon" onClick={handleReset}>
              <ArrowsClockwise className="h-4 w-4" />
            </Button>
            <Button variant="secondary" type="submit">
              Terapkan
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

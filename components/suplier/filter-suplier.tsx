'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Sliders } from 'lucide-react';
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
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const FilterSchema = z.object({
  keyword: z.string().optional(),
});

type FilterValues = z.infer<typeof FilterSchema>;

export function FilterForm() {
  return (
    <>
      <FilterFormPopover className="lg:hidden" />
      <FilterFormCard className="hidden lg:block" />
    </>
  );
}

export function FilterFormPopover(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
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
  const defaultValues: Partial<FilterValues> = {
    keyword: searchParams.get('keyword') ?? '',
  };
  const form = useForm<FilterValues>({
    resolver: zodResolver(FilterSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: FilterValues) {
    const searchParams = new URLSearchParams({
      keyword: data.keyword ?? '',
    });
    const queryString = '?' + searchParams.toString();
    router.replace(queryString, { scroll: false });
  }

  function handleReset(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    form.reset();
    router.push('/suplier');
  }

  console.log(searchParams);

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
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleReset(e)}
              >
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

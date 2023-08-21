"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const storeFormSchema = z.object({
  nama_pemilik: z
    .string()
    .min(4, {
      message: "Nama pemilik harus lebih dari 4 karakter",
    })
    .max(20, {
      message: "Nama pemilik tidak boleh lebih dari 20 karakter",
    }),
  email: z.string().min(4, {
    message: "Email harus lebih dari 4 karakter",
  }),
  no_hp: z
    .string()
    .min(4, {
      message: "No hp harus lebih dari 4 karakter",
    })
    .max(15, {
      message: "No hp tidak boleh lebih dari 15 karakter",
    }),
});

type ProfileFormValues = z.infer<typeof storeFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  // bio: 'I own a computer.',
  // urls: [
  // 	{ value: 'https://shadcn.com' },
  // 	{ value: 'http://twitter.com/shadcn' },
  // ],
};

export default function OwnerForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(storeFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nama_pemilik"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Pemilik</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="no_hp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No Hp</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Simpan</Button>
      </form>
    </Form>
  );
}

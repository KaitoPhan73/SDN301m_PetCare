"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { z } from "zod";

type PasswordFormBodyType = {
  password: string;
  newPassword: string;
  confirmedPassword: string;
};

const PasswordFormBody = z.object({
  password: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(1, "New password is required"),
  confirmedPassword: z.string().min(1, "Confirmed password is required"),
});

export function PasswordForm() {
  const router = useRouter();

  const form = useForm<PasswordFormBodyType>({
    resolver: zodResolver(PasswordFormBody),
    defaultValues: {
      password: "",
      confirmedPassword: "",
      newPassword: "",
    },
  });

  async function onSubmit(value: PasswordFormBodyType) {
    try {
      form.reset();
      // router.push(configRoute.password)
      router.refresh();
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <>This is password form</>
    // <Form {...form}>
    //   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    //     <FormField
    //       control={form.control}
    //       name="password"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Current password</FormLabel>
    //           <FormControl>
    //             <Input
    //               placeholder="Current password"
    //               type="password"
    //               {...field}
    //             />
    //           </FormControl>
    //           <FormDescription>
    //             For security reasons, we need your current password to make
    //             changes to your account.
    //           </FormDescription>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <FormField
    //       control={form.control}
    //       name="newPassword"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>New password</FormLabel>
    //           <FormControl>
    //             <Input placeholder="New password" type="password" {...field} />
    //           </FormControl>
    //           <FormDescription>
    //             Your new password must be at least 6 characters long.
    //           </FormDescription>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <FormField
    //       control={form.control}
    //       name="confirmedPassword"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Confirm password</FormLabel>
    //           <FormControl>
    //             <Input
    //               placeholder="Confirm password"
    //               type="password"
    //               {...field}
    //             />
    //           </FormControl>
    //           <FormDescription>Confirm your new password.</FormDescription>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <Button className="!mt-8">Update password</Button>
    //   </form>
    // </Form>
  );
}

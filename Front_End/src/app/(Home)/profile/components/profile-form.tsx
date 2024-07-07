"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { z } from "zod";

type AccountFormBodyType = {
  memberName: string;
  name: string;
  yob: number;
};

const AccountFormBody = z.object({
  memberName: z.string().min(1, "Member name is required"),
  name: z.string().min(1, "Name is required"),
  yob: z.number().int().min(1900, "Year of birth must be after 1900"),
});

export function ProfileForm({ data }: { data: any }) {
  const router = useRouter();
  const form = useForm<AccountFormBodyType>({
    resolver: zodResolver(AccountFormBody),
    defaultValues: {
      memberName: data?.memberName ?? "",
      name: data?.name ?? "",
      yob: data?.yob ?? 0,
    },
  });

  const onSubmit = async (values: AccountFormBodyType) => {
    try {
      router.refresh();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>this is form profile</>
    // <Form {...form}>
    //   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    //     <FormField
    //       control={form.control}
    //       name="memberName"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Member name</FormLabel>
    //           <FormControl>
    //             <Input placeholder="Member name" {...field} />
    //           </FormControl>
    //           <FormDescription>Member name is a unique identifier for your account.</FormDescription>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <FormField
    //       control={form.control}
    //       name="name"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Name</FormLabel>
    //           <FormControl>
    //             <Input placeholder="Name" {...field} />
    //           </FormControl>
    //           <FormDescription>Your name will be displayed on your profile.</FormDescription>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <FormField
    //       control={form.control}
    //       name="yob"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Year of birth</FormLabel>
    //           <FormControl>
    //             <Input placeholder="Year of birth" type="number" {...field} />
    //           </FormControl>
    //           <FormDescription>Your year of birth will be displayed on your profile.</FormDescription>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <Button className="!mt-8">Update profile</Button>
    //   </form>
    // </Form>
  );
}

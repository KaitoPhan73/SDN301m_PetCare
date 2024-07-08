import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/app/(auth)/login/components/user-auth-form";
import { ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function page() {
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href={"/register"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Sign up
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <Image
            src="https://static.vecteezy.com/system/resources/previews/025/273/812/non_2x/bones-for-dog-seamless-pattern-pets-background-for-pet-shop-websites-and-prints-social-media-posts-animal-product-design-cartoon-illustration-free-vector.jpg"
            alt=""
            width={1000}
            height={1000}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <Link
            href={"/homepage"}
            className="relative z-20 flex items-center text-2xl font-semibold gap-2"
          >
            <ShoppingBag className="h-8 w-8" />
            PagerPage
          </Link>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg text-black">
                &ldquo;For your pet more and more better &rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login with account
              </h1>
              <p className="white text-sm text-muted-foreground">
                Enter your username and password to login
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <div className="text-center mt-4 text-blue-500 font-semibold">
            <Link href={"/"}>Back to Home Page</Link>
          </div>
        </div>
      </div>
    </>
  );
}

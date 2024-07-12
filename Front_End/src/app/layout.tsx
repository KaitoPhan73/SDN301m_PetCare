import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SnackbarProviders from "@/redux/SnackBar";
import AppProvider from "@/redux/AppProvider";
import "slick-carousel/slick/slick.css";
import { AuthProvider } from "@/context/userContext";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SnackbarProviders>
          <AppProvider>
            <AuthProvider>{children}</AuthProvider>
          </AppProvider>
        </SnackbarProviders>
      </body>
    </html>
  );
}

"use client";
import { SnackbarProvider } from "notistack";
const SnackbarProviders = ({ children }: { children: React.ReactNode }) => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
};

export default SnackbarProviders;

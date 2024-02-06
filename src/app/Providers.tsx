"use client";
import { ThemeProvider } from "next-themes";
import React from "react";
import TrpcProvider from "./_trpc/Provider";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <ThemeProvider>
      <TrpcProvider>{children}</TrpcProvider>
    </ThemeProvider>
  );
}

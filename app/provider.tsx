'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Amplify } from "aws-amplify"
import outputs from "../amplify_outputs.json"
import React from "react";
Amplify.configure(outputs)

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </React.StrictMode>
  );
}

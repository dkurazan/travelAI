"use client";

import Chat from "@/components/Chat";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react';

export default function ChatPage() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Chat />
    </QueryClientProvider>
  );
}
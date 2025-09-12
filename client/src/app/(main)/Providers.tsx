'use client'

import React, { useState } from 'react';
import { ImageKitProvider } from "@imagekit/next";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'sonner';

const Providers = ({children} : {children : React.ReactNode}) => {
    const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ImageKitProvider
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
      >
        <Toaster richColors position="top-center" theme="dark" />
        {children}
      </ImageKitProvider>
    </QueryClientProvider>
  )
}

export default Providers;
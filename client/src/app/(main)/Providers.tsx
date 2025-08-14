'use client'

import React, { useState } from 'react';
import { ImageKitProvider } from "@imagekit/next";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const Providers = ({children} : {children : React.ReactNode}) => {
    const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ImageKitProvider
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
      >
        {children}
      </ImageKitProvider>
    </QueryClientProvider>
  )
}

export default Providers;
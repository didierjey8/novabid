import React, { ReactNode } from 'react';
import { AuthProvider } from '../modules/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { WagmiProvider } from 'wagmi';
import { createAppKit } from '@reown/appkit/react';
import { avalanche, avalancheFuji } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';


const projectId = '4161ad95f3dcfe9ccd3117978f2a4f82';

const metadata = {
  name: 'NOVABID',
  description: 'NOVABID Conection',
  url: '',
  icons: [],
};

const wagmiAdapter = new WagmiAdapter({
  networks: [avalanche, avalancheFuji],
  projectId,
});

createAppKit({
  themeMode: 'dark',
  adapters: [wagmiAdapter],
  networks: [avalanche, avalancheFuji],
  metadata: metadata,
  projectId,
  features: {
    analytics: true,
  },
});

interface ProvidersProps {
  children: ReactNode;
}

// Create QueryClient instance
const queryClient = new QueryClient();

/**
 * Centralized providers component
 * Contains all global providers for the application
 */
export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (<WagmiProvider config={wagmiAdapter.wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  </WagmiProvider>);
};

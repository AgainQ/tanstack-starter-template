import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './queryClient';

type ProviderProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

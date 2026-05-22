import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { queryClient } from './queryClient';
import { Providers } from './Providers';

export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  scrollRestoration: true,
  Wrap: Providers,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

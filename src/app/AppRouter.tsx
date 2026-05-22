import { routeTree } from '@/routeTree.gen';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { Providers } from './Providers';
import { queryClient } from './queryClient';

const router = createRouter({
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

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

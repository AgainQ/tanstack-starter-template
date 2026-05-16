import { Outlet, createRootRoute } from '@tanstack/react-router';
import DevTools from '../DevTools';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <DevTools />
    </>
  );
}

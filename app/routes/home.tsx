import type { Route } from './+types/home';
import HomePage from '@pages/home/home';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'MovieBox - Ultimate Movies Website' },
    {
      name: 'description',
      content:
        'Discover and comment on the best movies with MovieBox. Rate based on your experience and share your thoughts!'
    }
  ];
}

export default function Home() {
  return <HomePage />;
}

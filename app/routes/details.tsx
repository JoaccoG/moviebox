import type { Route } from './+types/details';
import DetailsPage from '@pages/details/details';

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

export default function Details() {
  return <DetailsPage />;
}

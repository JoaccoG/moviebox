import { useParams } from 'react-router';

export default function Details() {
  const { id } = useParams();

  return (
    <main className="flex flex-grow h-full flex-1">
      <h1>{id}</h1>
    </main>
  );
}

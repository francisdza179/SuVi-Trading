import type { ReactElement } from 'react';
import Link from 'next/link';

export default function NotFoundPage(): ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-insulation px-6 text-center">
      <h1 className="font-heading text-7xl font-extrabold tracking-tight text-steel md:text-9xl">
        404
      </h1>
      <p className="mt-4 max-w-md text-lg text-steel-300">
        The page you are looking for does not exist. It may have been moved or removed.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </main>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white">
      <nav className="flex justify-between items-center py-4 container mx-auto">
        <ul className="flex gap-2">
          <li>
            <Link href="/">Home</Link>
          </li>
          {session?.user && (
            <li>
              <Link href="/favorite-images">Favorites</Link>
            </li>
          )}
        </ul>

        <div>
          {session?.user ? (
            <div onClick={() => signOut()} className="text-inherit cursor-pointer">
              Sign out
            </div>
          ) : (
            <Link href="/login">Sign in</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

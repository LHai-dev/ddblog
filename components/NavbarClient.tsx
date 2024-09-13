'use client';

import Image from "next/image";
import Link from "next/link";
import { signIn } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Session } from 'next-auth';
import React from "react";  // Import Session type

interface NavbarClientProps {
  session: Session | null;
}

const NavbarClient: React.FC<NavbarClientProps> = ({ session }) => {
  const pathname = usePathname(); // Get the current path

  return (
    <nav className="bg-white w-full border-b md:border-0 md:static shadow-md">
      <div className="flex items-center justify-between px-4 max-w-screen-xl mx-auto py-4 md:px-8">

        {/* Logo Section */}
        <Link href="/">
          <Image
            src="https://miro.medium.com/v2/resize:fill:128:128/4*f7EyGRullh3Ih_2tm3k5xw.png"
            width={50}
            height={50}
            alt="Float UI logo"
            className="hover:opacity-80 transition-opacity duration-300"
          />
        </Link>

        {/* GitHub Sign-in Button (Hide if session exists) */}
        {!session && (
          <div className="md:inline-block">
            <a
              onClick={() => signIn('github')}
              className="py-3 px-6 text-white bg-black hover:bg-gray-800 transition-colors duration-300 rounded-md shadow-lg flex items-center space-x-3 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:outline-none"
              aria-label="Sign in with GitHub"
            >
              <Image width={6} height={6} src="/icons8-github.svg" alt="GitHub Logo" className="h-6 w-6" />
              <span className="font-semibold">Get Started with GitHub</span>
            </a>
          </div>
        )}

        {/* Display user info and "Create Blog Post" link if session exists */}
        {session && (
          <div className="flex items-center space-x-4">
            {/* Conditionally hide "Write" button if the user is on /blog/create */}
            {pathname !== '/blog/create' && (
              <Link href={"/blog/create"} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit">
                  <path d="M11 4H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8" />
                  <path d="M18.5 2.5A2.121 2.121 0 0 1 21 5L12 14l-4 1 1-4 9-9a2.121 2.121 0 0 1 3 0z" />
                </svg>
                <span className="font-medium">Write</span>
              </Link>
            )}

            {/* User avatar */}
            <Image
              src={session.user?.image || "/default-user-image.png"}
              width={40}
              height={40}
              alt="User Avatar"
              className="rounded-full"
            />
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavbarClient;

'use client';
import Image from "next/image";
import Link from "next/link";
import { signIn } from 'next-auth/react';

const Navbar = () => {
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

        {/* GitHub Sign-in Button */}
        <div className="md:inline-block">
          <a
            onClick={() => signIn('github')}
            className="py-3 px-6 text-white bg-black hover:bg-gray-800 transition-colors duration-300 rounded-md shadow-lg flex items-center space-x-3 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:outline-none"
            aria-label="Sign in with GitHub"
          >
            <img src="/icons8-github.svg" alt="GitHub Logo" className="h-6 w-6" />
            <span className="font-semibold">Get Started with GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;

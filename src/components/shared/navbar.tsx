'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hooks';
import { getUser } from '@/redux/features/authApi/authSlice';

import ProfileMenubar from './profileMenubar';
import Logo from './logo';

const Navbar = () => {
  const user = useAppSelector(getUser);

  return (
    <div className="relative border-b border-purple-500">
      <div className="bg-gradient-to-r from-blue-100 to-purple-200 h-[150px] w-full blur-2xl absolute "></div>
      <nav className="text-primary-foreground px-2 py-4 md:p-4 backdrop-blur-3xl bg-white/50">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Logo />

          {/* Links */}
          <div className={`flex items-center space-x-4`}>
            {user.email ? (
              <ProfileMenubar />
            ) : (
              <div className="flex flex-row items-center space-x-4">
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-[100px] p-[2px] transition duration-300 ease-in-out transform hover:scale-x-105 shadow-lg">
                  <Button
                    className="w-full rounded-full bg-gray-50 text-purple-600 hover:bg-gray-100 focus:ring focus:ring-purple-300 text-sm font-medium"
                    asChild
                  >
                    <Link href="/login" aria-label="Login">
                      Login
                    </Link>
                  </Button>
                </div>

                <button
                  className={`bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition duration-300 ease-in-out transform hover:scale-x-105 shadow-lg px-6 py-2.5`}
                >
                  <Link href="/sign-up">Sign Up</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

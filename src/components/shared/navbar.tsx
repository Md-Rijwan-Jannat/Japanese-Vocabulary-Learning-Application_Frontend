'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hooks';
import { clearCredentials, getUser } from '@/redux/features/authApi/authSlice';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut, Book, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Logo from './logo';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

const Navbar = () => {
  const user = useAppSelector(getUser);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearCredentials());
    Cookies.remove('accessToken');
    router.push('/login');
  };

  return (
    <div className="relative border-b border-purple-500">
      <div className="bg-gradient-to-r from-blue-100 to-purple-200 h-[150px] w-full blur-2xl absolute "></div>
      <nav className="text-primary-foreground p-2 md:p-4 backdrop-blur-3xl bg-white/50">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Logo />

          {/* Links */}
          <div className={`flex items-center space-x-4`}>
            {user.email ? (
              <div className="flex flex-row items-center space-y-0 gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="ring-2 ring-purple-500 cursor-pointer">
                      <AvatarImage
                        className="object-cover"
                        src={user?.photo || 'https://github.com/shadcn.png'}
                        alt={user?.name || 'User'}
                      />
                      <AvatarFallback className="text-gray-600">
                        {user?.name?.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-52 backdrop-blur-md bg-white/40"
                  >
                    <DropdownMenuLabel>
                      <div className="flex flex-col gap-2 items-center">
                        <Avatar className="ring-2 ring-gray-500 cursor-pointer">
                          <AvatarImage
                            className="object-cover"
                            src={user?.photo || 'https://github.com/shadcn.png'}
                            alt={user?.name || 'User'}
                          />
                          <AvatarFallback className="text-gray-600">
                            {user?.name?.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold">
                          {user?.name} {user?.role === 'admin' && '(Admin)'}
                        </h3>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator color="#4A7CF7" />
                    <DropdownMenuItem
                      className={`${user?.role === 'user' && 'hidden'}`}
                      onClick={() =>
                        router.push(
                          `${user?.role == 'admin' && '/admin-dashboard'}`
                        )
                      }
                    >
                      <Settings className={`mr-2 h-4 w-4 text-purple-500`} />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/lessons')}>
                      <Book className="mr-2 h-4 w-4 text-purple-500" />
                      <span>Lessons</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/tutorials')}>
                      <Video className="mr-2 h-4 w-4 text-purple-500" />
                      <span>Tutorials</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleLogout()}>
                      <LogOut className="mr-2 h-4 w-4 text-purple-500" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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

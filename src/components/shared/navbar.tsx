'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAppSelector } from '@/redux/hooks';
import { getUser } from '@/redux/features/authApi/authSlice';
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
import Image from 'next/image';
import logo from '../../assets/logo.png';
import Logo from './logo';

const Navbar = () => {
  const user = useAppSelector(getUser);
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />

        {/* Links */}
        <div className={` bg-transparent flex items-center space-x-4`}>
          {user ? (
            <div className="flex flex-row items-center space-y-0 gap-2">
              {user.role === 'admin' && (
                <Button variant="secondary" asChild className="">
                  <Link href="/admin/dashboard">Admin</Link>
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="ring-2 ring-green-500 cursor-pointer">
                    <AvatarImage
                      className="object-cover"
                      src={user?.photo || 'https://github.com/shadcn.png'}
                      alt={user?.name || 'User'}
                    />
                    <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(
                        `${
                          user?.role == 'admin'
                            ? '/admin-dashboard'
                            : 'user-dashboard'
                        }`
                      )
                    }
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/lessons')}>
                    <Book className="mr-2 h-4 w-4" />
                    <span>Lessons</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/tutorials')}>
                    <Video className="mr-2 h-4 w-4" />
                    <span>Tutorials</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
              <Button variant="secondary" asChild className="">
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

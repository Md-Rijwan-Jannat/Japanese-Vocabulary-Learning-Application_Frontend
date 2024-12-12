import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { clearCredentials, getUser } from '@/redux/features/authApi/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Book, LogOut, Settings, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function ProfileMenubar() {
  const user = useAppSelector(getUser);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(clearCredentials());
    Cookies.remove('accessToken');
    router.push('/login');
  };
  return (
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
              router.push(`${user?.role == 'admin' && '/admin-dashboard'}`)
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
  );
}

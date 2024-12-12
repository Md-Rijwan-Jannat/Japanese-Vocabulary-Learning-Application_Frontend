'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import Logo from '@/components/shared/logo';
import { getUser } from '@/redux/features/authApi/authSlice';
import { useAppSelector } from '@/redux/hooks';
import ProfileMenubar from '@/components/shared/profileMenubar';

type NavbarProps = {
  onOpenDrawer: () => void;
};

export function Navbar({ onOpenDrawer }: NavbarProps) {
  const user = useAppSelector(getUser);
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 max-w-6xl mx-auto">
        <Button
          variant="outline"
          size="icon"
          onClick={onOpenDrawer}
          className="mr-4 lg:hidden"
        >
          <MenuIcon className="h-4 w-4" />
          <span className="sr-only">Toggle Drawer</span>
        </Button>
        <Logo />
        <div className="flex-1" />
        <ProfileMenubar />
      </div>
    </div>
  );
}

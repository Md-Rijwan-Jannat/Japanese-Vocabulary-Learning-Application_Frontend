'use client';

import React, { ReactNode, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { LayoutDashboard, BookOpen, BookA, Video, Users } from 'lucide-react';
import DashboardButton from './_components/ui/dashboardButton';
import { Navbar } from './_components/ui/navbar';
import { useAppSelector } from '@/redux/hooks';
import { getUser } from '@/redux/features/authApi/authSlice';
import Logo from '@/components/shared/logo';

type TDashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: TDashboardLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const user = useAppSelector(getUser);

  const Sidebar = () => (
    <nav className="flex flex-col">
      <div className="lg:hidden">
        <Logo />
      </div>
      <div className="mt-5 lg:mt-1 flex flex-col space-y-4">
        <DashboardButton
          href="/admin-dashboard"
          icon={LayoutDashboard}
          text="Dashboard"
        />
        <DashboardButton
          href="/admin-dashboard/add-lesson"
          icon={LayoutDashboard}
          text="Add Lesson"
        />
        <DashboardButton
          href="/admin-dashboard/add-vocabulary"
          icon={LayoutDashboard}
          text="Add Vocabulary"
        />
        <DashboardButton
          href="/admin-dashboard/add-tutorial"
          icon={LayoutDashboard}
          text="Add Tutorial"
        />
        <DashboardButton
          href="/admin-dashboard/lesson-management"
          icon={BookOpen}
          text="Lessons Management"
        />
        <DashboardButton
          href="/admin-dashboard/vocabulary-management"
          icon={BookA}
          text="Vocabularies Management"
        />
        <DashboardButton
          href="/admin-dashboard/tutorials-management"
          icon={Video}
          text="Tutorials Management"
        />
        <DashboardButton
          href="/admin-dashboard/users-management"
          icon={Users}
          text="Users Management"
        />
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenDrawer={() => setIsDrawerOpen(true)} />
      <div className="flex max-w-6xl mx-auto">
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[300px] lg:hidden"
          >
            <Sidebar />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block w-[300px] p-3 md:p-6 border-r">
          <Sidebar />
        </div>
        <main className="flex-1 p-3 md:p-6 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}

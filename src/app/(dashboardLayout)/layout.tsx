'use client';

import React, { ReactNode, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { LayoutDashboard, BookOpen, BookA, Video, Users } from 'lucide-react';
import DashboardButton from './_components/ui/dashboardButton';
// import { Navbar } from './_components/ui/navbar';
import { useAppSelector } from '@/redux/hooks';
import { getUser } from '@/redux/features/authApi/authSlice';
import Logo from '@/components/shared/logo';
import Navbar from '@/components/shared/navbar';

type TDashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: TDashboardLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const user = useAppSelector(getUser);

  // Sidebar component
  const Sidebar = () => (
    <nav className="flex flex-col text-white mx-auto ml-1">
      <div className="lg:hidden mb-5">
        <Logo />
      </div>
      <div className="flex flex-col space-y-4">
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

  // If the user is a regular user, hide the sidebar
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background">
        {/* <Navbar onOpenDrawer={() => setIsDrawerOpen(true)} /> */}
        <Navbar />
        <main className="flex-1 p-3 max-w-6xl px-2 md:px-4 mx-auto md:p-6 overflow-hidden">
          {children}
        </main>
      </div>
    );
  }

  // If the user is an admin, show the sidebar
  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar onOpenDrawer={() => setIsDrawerOpen(true)} /> */}
      <Navbar />
      <div className="flex max-w-7xl mx-auto px-2 md:px-4">
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[300px] lg:hidden text-white"
          >
            <Sidebar />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block w-[300px] p-3 md:p-6 border-r text-white">
          <Sidebar />
        </div>
        <main className="flex-1 p-3 max-w-6xl mx-auto md:p-6 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

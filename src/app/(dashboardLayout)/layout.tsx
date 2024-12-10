import React, { ReactNode } from 'react';

type TDashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: TDashboardLayoutProps) {
  return <div>{children}</div>;
}

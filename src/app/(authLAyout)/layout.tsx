import React, { ReactNode } from 'react';

type TAuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: TAuthLayoutProps) {
  return <div>{children}</div>;
}

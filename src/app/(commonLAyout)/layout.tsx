import React, { ReactNode } from 'react';

type TCommonLayoutProps = {
  children: ReactNode;
};

export default function CommonLayout({ children }: TCommonLayoutProps) {
  return <div>{children}</div>;
}

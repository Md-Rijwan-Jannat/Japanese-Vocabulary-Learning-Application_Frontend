import React from 'react';

type TContainerProps = {
  children: React.ReactNode;
};
export default function Container({ children }: TContainerProps) {
  return <div className="max-w-6xl mx-auto px-2 md:px-4">{children}</div>;
}

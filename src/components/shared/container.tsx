import React from 'react';

type TContainerProps = {
  children: React.ReactNode;
};
export default function Container({ children }: TContainerProps) {
  return <div className="max-w-6xl mx-auto">{children}</div>;
}

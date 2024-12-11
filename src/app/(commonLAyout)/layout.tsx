import Container from '@/components/shared/container';
import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import React, { ReactNode } from 'react';

type TCommonLayoutProps = {
  children: ReactNode;
};

export default function CommonLayout({ children }: TCommonLayoutProps) {
  return (
    <div>
      {' '}
      <header className="bg-white border-white border-b-2">
        <Navbar />
      </header>
      <main className="h-fit xl:h-screen">
        <Container>{children}</Container>
      </main>
      <footer className="border-t">
        <Container>
          <Footer />
        </Container>
      </footer>
    </div>
  );
}

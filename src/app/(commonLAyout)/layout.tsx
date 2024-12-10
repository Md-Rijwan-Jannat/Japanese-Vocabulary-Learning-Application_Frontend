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
      <header className="bg-white border border-b">
        <Container>
          <Navbar />
        </Container>
      </header>
      <main>
        <Container>{children}</Container>
      </main>
      <footer className="bg-primary">
        <Container>
          <Footer />
        </Container>
      </footer>
    </div>
  );
}

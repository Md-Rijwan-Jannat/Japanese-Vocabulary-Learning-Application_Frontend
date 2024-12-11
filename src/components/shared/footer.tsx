'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import Logo from './logo';
import { buttonStyle } from '@/style';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup logic
    console.log('Signed up with:', email);
    setEmail('');
  };

  return (
    <footer className="text-black">
      <div className="mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm">
              Embark on your journey to master the Japanese language and
              culture.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:underline transition-all">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="hover:underline transition-all"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="hover:underline transition-all"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:underline transition-all"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <form onSubmit={handleSubmit} className="flex gap-2 items-center">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-primary-foreground text-primary"
              />
              <Button type="submit" variant="secondary" className={buttonStyle}>
                Subscribe
              </Button>
            </form>
            <div>
              <h4 className="text-lg font-semibold mb-4  mt-5">Contact Us</h4>
              <div className="flex space-x-4 gap-5">
                <a href="#" className="hover:text-purple-500 transition-colors">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="hover:text-purple-500 transition-colors">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="hover:text-purple-500 transition-colors">
                  <FaInstagram size={24} />
                </a>
                <a href="#" className="hover:text-purple-500 transition-colors">
                  <FaYoutube size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-primary-foreground/10 text-center">
          <p>
            &copy; {new Date().getFullYear()} Learn Japanese. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

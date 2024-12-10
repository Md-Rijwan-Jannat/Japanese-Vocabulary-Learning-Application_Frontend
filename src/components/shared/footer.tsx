'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup logic
    console.log('Signed up with:', email);
    setEmail('');
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Learn Japanese</h3>
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
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-primary-foreground text-primary"
              />
              <Button type="submit" variant="secondary" className="w-full">
                Subscribe
              </Button>
            </form>
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

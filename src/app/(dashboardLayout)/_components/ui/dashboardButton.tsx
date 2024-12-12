'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { type LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

type DashboardButtonProps = {
  href?: string;
  onClick?: () => void;
  text: string;
  className?: string;
  ariaLabel?: string;
  icon?: LucideIcon;
};

const DashboardButton: React.FC<DashboardButtonProps> = ({
  href,
  onClick,
  text,
  className,
  ariaLabel,
  icon: Icon,
}) => {
  const pathname = usePathname();

  const content = (
    <>
      {Icon && <Icon className="w-5 h-5 mr-2 flex-shrink-0" />}
      <span className="text-left">
        {text?.length > 15 ? text.substring(0, 20) + '...' : text}
      </span>
    </>
  );

  return (
    <div className="relative w-auto">
      {href ? (
        <Link
          href={href}
          aria-label={ariaLabel}
          className={clsx(
            `w-full rounded-md border text-sm font-medium py-2.5 px-4 flex items-center whitespace-nowrap transition-colors duration-300 ease-in-out`,
            pathname === href
              ? 'bg-blue-100 text-blue-500'
              : 'bg-purple-100 text-purple-500 hover:bg-blue-100 hover:text-blue-500',
            className
          )}
        >
          {content}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={clsx(
            `w-full rounded-md border text-sm font-medium py-2.5 px-4 flex items-center whitespace-nowrap transition-colors duration-300 ease-in-out transform hover:scale-105`,
            pathname === href
              ? 'bg-blue-100 text-blue-500'
              : 'bg-purple-100 text-purple-500 hover:bg-blue-100 hover:text-blue-500',
            className
          )}
          aria-label={ariaLabel}
        >
          {content}
        </button>
      )}
    </div>
  );
};

export default DashboardButton;

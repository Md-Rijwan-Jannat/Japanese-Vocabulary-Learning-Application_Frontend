'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { type LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

type SecondaryButtonProps = {
  href?: string;
  onClick?: () => void;
  text: string;
  className?: string;
  ariaLabel?: string;
  icon?: LucideIcon;
};

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  href,
  onClick,
  text,
  className,
  ariaLabel,
  icon: Icon,
}) => {
  const pathname = usePathname();
  const buttonClasses = clsx(
    `w-full rounded-full bg-gray-50 text-purple-600 hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white focus:ring focus:ring-purple-300 text-sm font-medium py-2.5 px-4 flex items-center whitespace-nowrap ${
      pathname === href
        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
        : ''
    }`,
    className
  );

  const containerClasses = `relative rounded-full px-[2px] transition duration-300 ease-in-out transform hover:scale-x-105 py-0.5 ${
    pathname === href ? '' : 'bg-gradient-to-r from-blue-500 to-purple-500'
  } `;

  const content = (
    <>
      {Icon && <Icon className="w-5 h-5 mr-2 flex-shrink-0" />}
      <span className="text-left">
        {text?.length > 15 ? text.substring(0, 20) + '...' : text}
      </span>
    </>
  );

  return (
    <div className={containerClasses}>
      {href ? (
        <Link href={href} aria-label={ariaLabel} className={buttonClasses}>
          {content}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={buttonClasses}
          aria-label={ariaLabel}
        >
          {content}
        </button>
      )}
    </div>
  );
};

export default SecondaryButton;

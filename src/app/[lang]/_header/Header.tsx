'use client';

import { usePathname } from 'next/navigation';
import LocaleSwitcher from './LocaleSwitcher';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import Link from 'next/link';

const DarkModeToggle = dynamic(() => import('./DarkModeToggle'), {
  ssr: false,
});

export function Header({ dictionary }: { dictionary: { author: string; home: string; theme: { dark: string; light: string } } }) {
  const isHome = usePathname().split('/').length < 3;
  const buttonClassNames = ['dark:text-gray-400 dark:hover:bg-gray-900 hover:bg-gray-100', {
    'text-gray-500': !isHome,
  }];

  return (
    <div
      className={classNames('flex h-[--h-header] z-10 w-full justify-between items-center font-mono text-sm p-1', {
      })}
    >
      <Link href="/" className={classNames('p-1', { hidden: isHome })}>
        {dictionary.home}
      </Link>
      <div className="min-w-[113px]">
        <DarkModeToggle dark={dictionary.theme.dark} light={dictionary.theme.light} className={classNames(...buttonClassNames)} />
      </div>
      <LocaleSwitcher className={classNames(...buttonClassNames)} />
      <div className="fixed bottom-0 left-0 flex h-[--h-footer] md:pt-0 w-full items-end justify-center items-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black md:static md:h-auto md:w-auto md:bg-none">
        <a
          className="pointer-events-none flex place-items-center gap-2 md:pointer-events-auto md:p-0"
          href="https://nwel.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          {dictionary.author}
        </a>
      </div>
    </div>
  );
}

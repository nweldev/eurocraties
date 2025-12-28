'use client';

import { Locale, intlCookieKey } from '@/i18n-config';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { ComponentProps } from 'react';

export default function LocaleSwitcher({ className }: ComponentProps<'button'>) {
  const router = useRouter();

  const dictionary = {
    fr: {
      switch: 'Passer en ',
      lang: 'français',
    },
    en: {
      switch: 'Switch to ',
      lang: 'english',
    },
  };

  const pathName = usePathname();
  if (!pathName) return '/';
  const pathSegments = pathName.split('/');
  const currentLanguage = pathSegments[1];

  const redirectedPathName = (locale: string) => {
    pathSegments[1] = locale;
    return pathSegments.join('/');
  };

  const setPreferredLanguage = (locale: Locale) => {
    Cookies.set(intlCookieKey, locale);
    router.push(redirectedPathName(locale));
  };

  const target = currentLanguage === 'fr' ? 'en' : 'fr';

  return (
    <button
      className={classNames(
        'focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1',
        className
      )}
      onClick={() => setPreferredLanguage(target)}
    >
      <span className="hidden md:inline">{dictionary[target].switch}</span>
      {dictionary[target].lang}
    </button>
  );
}

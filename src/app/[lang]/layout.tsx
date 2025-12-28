import './globals.css';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import classNames from 'classnames';
import { Inter } from 'next/font/google';
import { Locale } from '@/i18n-config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Eurocraties',
  description: "Comprendre et explorer la politique des pays d'Europe",
  themeColor: '#000',
  other: {
    'msapplication-TileColor': '#000',
    'msapplication-TileImage': '/apple-icon/xlarge',
  },
};

export default function RootLayout({ children, params: { lang } }: { children: React.ReactNode; params: { lang: Locale } }) {
  const prefersDark = cookies().get('color-theme')?.value === 'dark';
  return (
    <html lang={lang} className={classNames({ dark: prefersDark })}>
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}

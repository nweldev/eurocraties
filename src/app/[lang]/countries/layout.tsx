import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionnary';
import { Header } from '../_header/Header';

export default async function CountriesLayout({ children, params: { lang } }: { children: React.ReactNode; params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return (
    <>
      <Header dictionary={dictionary.header} />
      {children}
    </>
  );
}

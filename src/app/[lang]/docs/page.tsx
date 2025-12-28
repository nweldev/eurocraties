import { getDictionary } from '@/get-dictionnary';
import { Header } from '../_header/Header';
import { Locale } from '@/i18n-config';

import styles from '../document.module.scss';
import classNames from 'classnames';

export default async function Docs({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  
  return (
    <main className={classNames("min-h-[--h-full-content]", styles.document)}>
      <Header dictionary={dictionary.header} />
      <article className='max-w-[960px] md:w-[960px] mx-auto mt-16'>
        <h1 className='text-4xl mb-8'>{dictionary.docs.title}</h1>
        <p className="italic">
          {dictionary.global.wip}
        </p>
      </article>
    </main>
  );
}

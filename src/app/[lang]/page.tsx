import { getDictionary } from '@/get-dictionnary';
import { Locale } from '@/i18n-config';
import Link from 'next/link';
import SimpleMap from './_components/simple-map';
import { Header } from './_header/Header';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 pb-24">
      <Header dictionary={dictionary.header} />
      <div className="grid grid-cols-1 grid-rows-1 place-items-center my-4">
        <div className="w-full z-0 col-start-1 row-start-1">
          <SimpleMap className='stroke-4 stroke-zinc-300 dark:stroke-zinc-800 fill-none w-full' />
        </div>
        <div className="text-center relative z-1 col-start-1 row-start-1 m-6">
          <h1 className="text-5xl">{dictionary.global.appName}</h1>
          <p className="italic">{dictionary.global.tagline}</p>
        </div>
      </div>

      <div className="mb-32 w-full grid md:max-w-5xl md:w-full md:mb-0 md:grid-cols-2 md:text-left">
        <Link
          href="/countries"
          className="md:text-right md:justify-self-end group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            <span className="hidden md:inline-block transition-transform group-hover:-translate-x-1 motion-reduce:transform-none">
              &lt;-
            </span>{' '}
            {dictionary.home.links.map.title}{' '}
            <span className="inline-block md:hidden transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{dictionary.home.links.map.description}</p>
        </Link>

        <Link
          href="/docs"
          className="md:justify-self-start group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            {dictionary.home.links.docs.title}{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{dictionary.home.links.docs.description}</p>
        </Link>
      </div>
    </main>
  );
}

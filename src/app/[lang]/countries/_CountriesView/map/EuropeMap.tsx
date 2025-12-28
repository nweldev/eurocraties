'use client';

import { Fragment, ReactNode, useContext, useEffect, useState } from 'react';
import { svgCountries } from './svgCountries';
import classNames from 'classnames';
import { IdeologicFamily } from '@prisma/client';
import { CountriesParamsContext, CountriesParamsState } from '../CountriesView';
import Link from 'next/link';
import { conservatives, liberals } from '@/app/api/_types/ideologies';

export default function EuropeMap() {
  const { countriesParams, setCountriesParams } = useContext(CountriesParamsContext) as CountriesParamsState;
  const [countries, setCountries] = useState(svgCountries as any[]);

  useEffect(() => {
    const countriesFetch = async () => {
      setCountriesParams({ ...countriesParams, loading: true });
      const res = await fetch('/api/countries?synthetic=true');
      const { data } = await res.json();

      const mergedData = svgCountries.map((svgCountrie: any) => ({
        ...svgCountrie,
        ...data[svgCountrie.code],
      }));

      // set state when the data received
      setCountries(mergedData);
      setCountriesParams({ ...countriesParams, loading: false });
    };

    countriesFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const virtualCountries = ['ue', 'flawed-democracies'];

  const linkWrapper = (countrie: any, children: ReactNode) =>
    virtualCountries.includes(countrie.code) ? (
      <Fragment key={countrie.code}>{children}</Fragment>
    ) : (
      <Link href={`/countries/${countrie.code}`} key={countrie.code}>
        {children}
      </Link>
    );

  const govLeaderColor = (countrie: any): string => {
    if (countriesParams.group !== 'gov' || !countrie.gov) return '';

    if (countrie.gov.leaderFamily === IdeologicFamily.FAR_RIGHT) {
      return 'fill-blue-800 dark:fill-blue-950';
    }
    if (countrie.gov.leaderFamily === IdeologicFamily.CATCH_ALL) {
      return 'fill-yellow-400';
    }

    const leaderIdeology = countrie.parties[0]?.ideology;
    if (leaderIdeology) {
      if (liberals.includes(leaderIdeology.economy) && conservatives.includes(leaderIdeology.social)) {
        return 'fill-sky-600 dark:fill-sky-800';
      }
    }

    return '';
  };

  const countriesPaths = countries.map((countrie) =>
    linkWrapper(
      countrie,
      <path
        d={countrie.path}
        className={classNames(govLeaderColor(countrie), {
          'fill-none': countrie.code === 'ue',
          'stroke-4 stroke-red-800': countrie.code === 'ue' && countriesParams.ueBorder,
          'stroke-none': countrie.code === 'ue' && !countriesParams.ueBorder,
          hidden: countrie.code === 'flawed-democracies',
        })}
      />
    )
  );

  return (
    <svg
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth=".5"
      baseProfile="tiny"
      version="1.2"
      viewBox="0 0 702 540"
      xmlns="http://www.w3.org/2000/svg"
      className="md:h-[--h-full-content] py-4 m-auto min-w-[600px] min-h-[450px] snap-center fill-neutral-300 dark:fill-neutral-900 stroke-black dark:stroke-white"
    >
      {countriesPaths}
    </svg>
  );
}

'use client';

import { ComponentProps, createContext, useState } from 'react';
import EuropeMap from './map/EuropeMap';
import MapMenu from './menu/MapMenu';
import { PropsWithDictionary } from '@/types';
import classNames from 'classnames';

export type CountriesGroup = 'gov';

export interface CountriesParams {
  ueBorder: boolean;
  group?: CountriesGroup;
  loading: boolean
}

export type CountriesParamsState = {
  countriesParams: CountriesParams;
  setCountriesParams: (params: CountriesParams) => void;
};

const InitialCountriesParams: CountriesParams = {
  ueBorder: false,
  group: 'gov',
  loading: true,
};

export const CountriesParamsContext = createContext<CountriesParamsState | {}>({});

export default function CountriesView({ dictionary, className, ...props }: PropsWithDictionary<ComponentProps<'div'>, any>) {
  const [countriesParams, setCountriesParams] = useState(InitialCountriesParams);

  return (
    <CountriesParamsContext.Provider
      value={{
        countriesParams,
        setCountriesParams,
      }}
    >
      <div className={classNames("flex flex-col-reverse w-full md:flex-row", className)} {...props}>
        <div className="grow min-w-[300px] md:max-w-[500px] md:mr-4 p-4 overflow-y-scroll pb-[--h-footer] md:pb-0">
          <MapMenu dictionary={dictionary.menu} />
        </div>
        <div className="flex item-center relative md:grow max-md:max-w-screen overflow-scroll snap-x">
          <EuropeMap />
        </div>
      </div>
    </CountriesParamsContext.Provider>
  );
}

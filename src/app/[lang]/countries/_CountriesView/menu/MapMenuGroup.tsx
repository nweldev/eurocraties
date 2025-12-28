'use client';

import { PropsWithChildren, useContext } from 'react';
import { CountriesGroup, CountriesParamsContext, CountriesParamsState } from '../CountriesView';
import { PropsWithDictionary } from '@/types';
import { ToggleSwitch } from '@/app/shared/ToggleSwitch';
import { Spinner } from '@/app/shared/Spinner';

export default function MapMenuGroup({
  children,
  dictionary,
  title,
  group,
  toggle = false,
}: PropsWithDictionary<PropsWithChildren<{ title: string; group?: CountriesGroup; toggle?: boolean }>, { loading: string }>) {
  const { countriesParams, setCountriesParams } = useContext(CountriesParamsContext) as CountriesParamsState;

  const handleChange = () => {
    if (countriesParams.group !== group) {
      setCountriesParams({ ...countriesParams, group });
    } else {
      setCountriesParams({ ...countriesParams, group: undefined });
    }
  };

  return (
    <div className="mb-8">
      <h2 className="flex flex-row gap-2 my-4">
        <span className="font-bold grow">{title}</span>
        {toggle &&
          (countriesParams.loading ? (
            <Spinner aria-label={dictionary?.loading} />
          ) : (
            <ToggleSwitch label="" checked={countriesParams.group === group} onChange={handleChange} />
          ))}
      </h2>
      {children}
    </div>
  );
}

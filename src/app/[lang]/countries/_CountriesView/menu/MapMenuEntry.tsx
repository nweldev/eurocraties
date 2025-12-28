'use client';

import { useContext } from 'react';
import { CountriesParamsContext, CountriesParamsState } from '../CountriesView';
import { ToggleSwitch } from '@/app/shared/ToggleSwitch';
import classNames from 'classnames';

export default function MapMenuEntry({
  text,
  stroke,
  color,
  darkColor,
  borderColor = 'black',
  darkBoderColor = 'white',
  toggle = false,
}: {
  text: string;
  color?: string;
  darkColor?: string;
  stroke?: string;
  borderColor?: string;
  darkBoderColor?: string;
  toggle?: boolean
}) {
  const legendStyle = `w-6 h-6 border${stroke ? `-${stroke}` : ''} border-${borderColor}  bg-${color}`;
  const {
    countriesParams,
    setCountriesParams
  } = useContext(CountriesParamsContext) as CountriesParamsState;

  const handleChange = () => {
    setCountriesParams({ ...countriesParams, ueBorder: !countriesParams.ueBorder });
  };

  return (
    <div className="flex flex-row gap-2 mb-2">
      <span className={classNames(`w-6 h-6 mr-2 border-${borderColor} dark:border-${darkBoderColor}`, {
        border: !stroke,
        [`border-${stroke}`]: stroke,
        [`bg-${color}`]: color,
        [`dark:bg-${darkColor}`]: darkColor
      })}></span>
      <span className="grow">{text}</span>
      { toggle && <ToggleSwitch checked={!!countriesParams.ueBorder} onChange={handleChange} /> }
    </div>
  );
}

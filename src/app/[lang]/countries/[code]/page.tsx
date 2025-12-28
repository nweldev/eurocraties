import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionnary';
import { getBaseUrl } from '@/app/shared/utils/getBaseUrl';

import styles from '../../document.module.scss';
import { ElectionRslt, IdeologicFamily, Party } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import classNames from 'classnames';
import { IdeologicGroup } from '@/app/api/countries/_synth';

const fetchCountry = async (code: string) => {
  const res = await fetch(`${getBaseUrl()}/api/countries/${code}?synthetic=true}`, { cache: 'force-cache' });
  const { data } = await res.json();

  return data;
};

const ColorMark = ({ color }: { color: string }) => {
  return <span className="inline-block w-4 h-4 border border-gray-400 align-sub mr-4" style={{ backgroundColor: `#${color}` }}></span>;
};

const IdeologicGroupColors: Record<IdeologicGroup, string> = {
  farLeft: 'FF0000',
  left: 'ff4c4c',
  thirdWay: 'FFA07A',
  centre: 'b2ffff',
  right: '2986cc',
  farRight: '103551',
  unclassified: '94a3b8',
};

export default async function Countries({ params: { lang, code: countryCode } }: { params: { lang: Locale; code: string } }) {
  const dictionary = (await getDictionary(lang)).countries.details;
  const country = await fetchCountry(countryCode);
  const dateFormat = Intl.DateTimeFormat(lang, { dateStyle: 'long' });

  return (
    <div className={classNames('min-h-[--h-full-content]', styles.document)}>
      <h1>{country.name[lang] || country.name.vo}</h1>
      <h2>{dictionary.government}</h2>
      {country.parties.length < 1 ? (
        <p className="italic">{dictionary.noData}</p>
      ) : (
        <>
          {country.parties.length > 1 && <p className="font-bold">{dictionary.coalition}:</p>}
          <ul>
            {country.parties.map((party: any) => (
              <li key={party.id}>
                <ColorMark color={party.color} />
                {party.name[lang] || party.name.vo}
                {!!party.name[lang] && party.name[lang] !== party.name.vo && <> ({party.name.vo})</>}:{' '}
                {dictionary.ideology.family[party.ideology.family as IdeologicFamily]}
                {/* &mdash; {country.elections[0].results.find((rslt: any) => rslt.candidate.party.code === party.code)?.score}% */}
              </li>
            ))}
          </ul>
        </>
      )}
      <h2>{dictionary.lastElection}</h2>
      {country.elections.length < 1 ? (
        <p className="italic">{dictionary.noData}</p>
      ) : (
        <>
          <p>{dateFormat.format(new Date(country.elections[0].date))}</p>
          <h3>{dictionary.results}</h3>
          <ul>
            {country.elections[0].results
              .sort((a: ElectionRslt, b: ElectionRslt) => {
                // notice the minus sign for descinding ordering
                return -new Decimal(a.score).comparedTo(new Decimal(b.score));
              })
              .map((rslt: any) => {
                const candidate = rslt.candidate.party || rslt.candidate.alliance;
                if (!candidate) return;
                return (
                  <li key={rslt.id}>
                    <ColorMark color={candidate.color as string} />
                    {candidate.name[lang]} ({dictionary.ideology.family[candidate.ideology.family as IdeologicFamily]}): {rslt.score}%
                    &ensp;&ndash;&ensp;
                    {candidate.lowHouseSeats ? (
                      <>
                        {candidate.lowHouseSeats} {candidate.lowHouseSeats > 1 ? dictionary.seats : dictionary.seat} /{' '}
                        {country.lowHouseSeats} ({Math.round((candidate.lowHouseSeats * 100) / country.lowHouseSeats)}%)
                      </>
                    ) : (
                      <>0 {dictionary.seat}</>
                    )}
                  </li>
                );
              })}
          </ul>
          <h3>{dictionary.byFamily}</h3>
          <ul>
            {Object.entries(country.families).map(([key, summary]: [string, any]) => (
              <li key={key}>
                <span className="font-bold">
                  <ColorMark color={IdeologicGroupColors[key as IdeologicGroup]} />
                  {dictionary.ideology.group[key as IdeologicGroup]}
                </span>
                : {summary.score > 0 ? `${summary.score}%` : dictionary.negligible}
                {summary.score > 0 ? (
                  <>
                    &ensp;&ndash;&ensp;{summary.seats} {summary.seats > 1 ? dictionary.seats : dictionary.seat} / {country.lowHouseSeats} (
                    {summary.share}%)
                  </>
                ) : (
                  ''
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

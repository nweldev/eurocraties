import { PrismaClient, Party, Candidate, Election, Countrie, Alliance } from '@prisma/client';
import { itaElectionsSeed } from './ita/index.ts';
import { CountryCode } from '../countries.ts';
import { fraElectionsSeed } from './fra/index.ts';

export async function electionsSeed(prisma: PrismaClient, countries: Record<CountryCode, Countrie>, partiesAndAlliances: Record<CountryCode, {
  parties: Record<string, Party>;
  alliances: Record<string, Alliance>;
}>) {
  const elections: Election[] = [
    ...await itaElectionsSeed(prisma, countries.ita.id, partiesAndAlliances.ita),
    ...await fraElectionsSeed(prisma, countries.fra.id, partiesAndAlliances.fra),
  ];
  return elections
}

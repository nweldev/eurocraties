import { Alliance, Countrie, Party, PrismaClient } from '@prisma/client';
import { ItaAllianceCode, ItaPartyCode, itaPartiesSeed } from './ita.ts';
import { CountryCode } from '../countries.ts';
import { fraPartiesSeed } from './fra.ts';
import { gbrPartiesSeed } from './gbr.ts';

export type PartyCode = ItaPartyCode;
export type AllianceCode = ItaAllianceCode;

export type PartiesAndAlliances = Partial<
  Record<
    CountryCode,
    {
      parties: Record<string, Party>;
      alliances: Record<string, Alliance>;
    }
  >
>;

export async function partiesSeed(prisma: PrismaClient, countries: Record<string, Countrie>) {
  const parties: PartiesAndAlliances = {
    ita: await itaPartiesSeed(prisma, countries.ita.id),
    fra: await fraPartiesSeed(prisma, countries.fra.id),
    gbr: await gbrPartiesSeed(prisma, countries.gbr.id)
  };
  return parties;
}

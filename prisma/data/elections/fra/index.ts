import { Alliance, Candidate, Election, Party, PrismaClient } from '@prisma/client';
import { fra2022ElectionsSeed } from './2022.ts';
import { FraAllianceCode, FraPartyCode } from '../../parties/fra.ts';

export type FraCandidateCode = FraPartyCode | FraAllianceCode;

export async function fraElectionsSeed(
  prisma: PrismaClient,
  countryId: number,
  { parties, alliances }: { parties: Record<FraPartyCode, Party>; alliances: Record<FraAllianceCode, Alliance> }
): Promise<Election[]> {
  const candidates: Record<string, Candidate> = {};
  await Promise.all(
    Object.entries(parties).map(async ([key, party]) => {
      candidates[key] = await prisma.candidate.create({
        data: {
          party: {
            connect: party,
          },
        },
      });
    })
  );
  await Promise.all(
    Object.entries(alliances).map(async ([key, alliance]) => {
      candidates[key] = await prisma.candidate.create({
        data: {
          alliance: {
            connect: alliance,
          },
        },
      });
    })
  );

  console.log(`INSERT candidates (fra): ${Object.values(candidates).length}`)

  const elections: Election[] = [await fra2022ElectionsSeed(prisma, countryId, candidates as Record<FraCandidateCode, Candidate>)];
  return elections;
}

import { Alliance, Candidate, Election, Party, PrismaClient } from '@prisma/client';
import { ita2022ElectionsSeed } from './2022.ts';
import { ItaAllianceCode, ItaPartyCode } from '../../parties/ita.ts';

export type ItaCandidateCode = ItaPartyCode | ItaAllianceCode;

export async function itaElectionsSeed(
  prisma: PrismaClient,
  countryId: number,
  { parties, alliances }: { parties: Record<ItaPartyCode, Party>; alliances: Record<ItaAllianceCode, Alliance> }
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

  console.log(`INSERT candidates (ita): ${Object.values(candidates).length}`)

  const elections: Election[] = [await ita2022ElectionsSeed(prisma, countryId, candidates as Record<ItaCandidateCode, Candidate>)];
  return elections;
}

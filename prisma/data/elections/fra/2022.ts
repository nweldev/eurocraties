import { Candidate, Election, ElectionType, PrismaClient } from '@prisma/client';
import { FraCandidateCode } from './index.ts';

export async function fra2022ElectionsSeed(
  prisma: PrismaClient,
  countryId: number,
  candidates: Record<FraCandidateCode, Candidate>
): Promise<Election> {
  const election = await prisma.election.create({
    data: {
      date: new Date('2022-06-19'),
      type: ElectionType.PARLEMENTARY,
      countrie: {
        connect: { id: countryId },
      },
    },
  });

  console.log(`INSERT election fra 2022`);

  const results = [
    await prisma.electionRslt.create({
      data: {
        score: 25.75,
        election: {
          connect: election,
        },
        candidate: {
          connect: candidates.ens,
        },
      },
    }),
    await prisma.electionRslt.create({
      data: {
        score: 25.66,
        election: {
          connect: election,
        },
        candidate: {
          connect: candidates.nupes,
        },
      },
    }),
    await prisma.electionRslt.create({
      data: {
        score: 18.68,
        election: {
          connect: election,
        },
        candidate: {
          connect: candidates.rn,
        },
      },
    }),
    await prisma.electionRslt.create({
      data: {
        score: 11.29,
        election: {
          connect: election,
        },
        candidate: {
          connect: candidates.udc,
        },
      },
    }),
    await prisma.electionRslt.create({
      data: {
        score: 4.24,
        election: {
          connect: election,
        },
        candidate: {
          connect: candidates.rec,
        },
      },
    }),
  ];

  console.log(`INSERT electionRslt (fra 2022): ${results.length}`);

  return election;
}

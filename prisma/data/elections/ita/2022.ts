import { Candidate, Election, ElectionType, PrismaClient } from '@prisma/client';
import { ItaCandidateCode } from './index.ts';

export async function ita2022ElectionsSeed(
  prisma: PrismaClient,
  countryId: number,
  candidates: Record<ItaCandidateCode, Candidate>
): Promise<Election> {
  const election = await prisma.election.create({
    data: {
      date: new Date('2022-09-25'),
      type: ElectionType.PARLEMENTARY,
      countrie: {
        connect: { id: countryId },
      },
    },
  });

  console.log(`INSERT election ita 2022`);

  const results = [
    await prisma.electionRslt.create({
      data: {
        score: 25.98,
        election: {
          connect: election,
        },
        candidate: {
          connect: candidates.fdi,
        },
      },
    }),
    await prisma.electionRslt.create({
      data: {
        score: 8.79,
        election: {
          connect: election,
        },
        candidate: {
          connect: candidates.lega,
        },
      },
    }),
    await prisma.electionRslt.create({
      data: {
        score: 8.11,
        election: {
          connect: election,
        },
        candidate: {
          connect: candidates.fi,
        },
      },
    }),
    await prisma.electionRslt.create({
      data: {
        score: 0.90,
        election: {
          connect: election,
        },
        candidate: {
          connect: candidates.nm,
        },
      },
    }),
    await prisma.electionRslt.create({
      data: {
        score: 19.04,
        election: {
          connect: election,
        },
        candidate: {
          connect: candidates.pd,
        },
      },
    }),
    await prisma.electionRslt.create({
      data: {
        score: 3.64,
        election: {
          connect: election,
        },
        candidate: {
          connect: candidates.avs,
        },
      },
    }),
    await prisma.electionRslt.create({
      data: {
        score: 2.83,
        election: {
          connect: election,
        },
        candidate: {
          connect: candidates.plusEu,
        },
      },
    }),
    await prisma.electionRslt.create({
      data: {
        score: 0.62,
        election: {
          connect: election,
        },
        candidate: {
          connect: candidates.ic,
        },
      },
    }),
    await prisma.electionRslt.create({
      data: {
        score: 15.40,
        election: {
          connect: election,
        },
        candidate: {
          connect: candidates.m5s,
        },
      },
    }),
    await prisma.electionRslt.create({
      data: {
        score: 7.78,
        election: {
          connect: election,
        },
        candidate: {
          connect: candidates.aziv,
        },
      },
    }),
    await prisma.electionRslt.create({
      data: {
        score: 1.90,
        election: {
          connect: election,
        },
        candidate: {
          connect: candidates.ie,
        },
      },
    }),
    await prisma.electionRslt.create({
      data: {
        score: 1.43,
        election: {
          connect: election,
        },
        candidate: {
          connect: candidates.up,
        },
      },
    }),
  ];

  console.log(`INSERT electionRslt (ita 2022): ${results.length}`);

  return election;
}

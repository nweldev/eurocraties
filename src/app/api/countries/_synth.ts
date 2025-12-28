import { IdeologicFamily, Prisma } from '@prisma/client';
import { FamilyData, leftFamilies, rightFamilies } from '../_types/ideologies';

// TODO: replace any with accurate types
export const synthetiseCountrie = (countrie: any) => {
  const data = {
    ...countrie,
    gov: {
      leaderFamily: countrie.parties[0]?.ideology?.family,
      hasFarRight: !!countrie.parties.find((party: any) => party.ideology?.family === IdeologicFamily.FAR_RIGHT),
      ideologies: countrie.parties.map((party: any) => party.ideology),
    },
    families: {},
  };

  if (countrie.elections[0]) {
    const families: Record<string, FamilyData> = countrie.elections[0].results.reduce(
      (acc: any, result: any) => {
        let familyKey: 'farLeft' | 'left' | 'thirdWay' | 'centre' | 'right' | 'farRight' = 'centre';
        let candidateFamily = result.candidate.party?.ideology?.family || result.candidate.alliance?.ideology?.family;
        if (!candidateFamily) {
          return acc;
        }
        if (candidateFamily === IdeologicFamily.FAR_LEFT) {
          familyKey = 'farLeft';
        } else if (leftFamilies.includes(candidateFamily)) {
          familyKey = 'left';
        } else if (candidateFamily === IdeologicFamily.THIRD_WAY) {
          familyKey = 'thirdWay';
        } else if (rightFamilies.includes(candidateFamily)) {
          familyKey = 'right';
        } else if (candidateFamily === IdeologicFamily.FAR_RIGHT) {
          familyKey = 'farRight';
        }
        acc[familyKey].score = acc[familyKey].score.add(result.score);
        let seats = result.candidate.party?.lowHouseSeats;
        if (seats === undefined && result.candidate.alliance) {
          seats = result.candidate.alliance.lowHouseSeats;
          if (seats === undefined) {
            seats =
              result.candidate.alliance?.parties.reduce((acc: any, party: any) => {
                return acc + party.lowHouseSeats;
              }, 0) || 0;
          }
        }

        acc[familyKey].seats += seats;
        acc[familyKey].share = Math.round((acc[familyKey].seats * 100) / countrie.lowHouseSeats);

        return acc;
      },
      {
        farLeft: {
          score: new Prisma.Decimal(0.0),
          seats: 0,
          share: 0,
        },
        left: {
          score: new Prisma.Decimal(0.0),
          seats: 0,
          share: 0,
        },
        thirdWay: {
          score: new Prisma.Decimal(0.0),
          seats: 0,
          share: 0,
        },
        centre: {
          score: new Prisma.Decimal(0.0),
          seats: 0,
          share: 0,
        },
        right: {
          score: new Prisma.Decimal(0.0),
          seats: 0,
          share: 0,
        },
        farRight: {
          score: new Prisma.Decimal(0.0),
          seats: 0,
          share: 0,
        },
      }
    );

    families.unclassified = Object.values(families).reduce(
      (acc, familyData) => ({
        score: acc.score.minus(familyData.score),
        seats: acc.seats - familyData.seats,
        share: acc.share - familyData.share,
      }),
      {
        score: new Prisma.Decimal(100),
        seats: countrie.lowHouseSeats,
        share: 100,
      }
    );

    data.families = families || [];
  }

  return data;
};

export const countryBaseProps = {
  code: true,
  hasHighHouse: true,
  lowHouseSeats: true,
  isMonarchy: true,
  isPresidential: true,
  name: {
    select: {
      fr: true,
      en: true,
      vo: true,
    },
  },
};

export const synthetisedCountrieSelector = {
  ...countryBaseProps,
  parties: {
    where: {
      isGoverning: true,
    },
    orderBy: [
      {
        lowHouseSeats: Prisma.SortOrder.desc,
      },
    ],
    include: {
      name: true,
      ideology: true,
    },
  },
  elections: {
    where: {
      date: {
        lt: new Date(),
      },
    },
    orderBy: {
      date: Prisma.SortOrder.desc,
    },
    take: 1,
    include: {
      results: {
        include: {
          candidate: {
            include: {
              party: {
                include: {
                  name: true,
                  ideology: true,
                },
              },
              alliance: {
                include: {
                  name: true,
                  ideology: true,
                  parties: {
                    select: {
                      name: true,
                      ideology: true,
                      lowHouseSeats: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

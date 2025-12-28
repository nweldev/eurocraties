import {
  Alliance,
  EconomicIdeology,
  IdeologicFamily,
  NationalIdeology,
  Party,
  PrismaClient,
  Religion,
  SocialIdeology,
} from '@prisma/client';

export type GbrPartyCode = 'cp';
// export type GbrAllianceCode = ;

export async function gbrPartiesSeed(prisma: PrismaClient, countryId: number) {
  // const alliances: Record<GbrAllianceCode, Alliance> = {
  // };

  // console.log(`INSERT alliances (gbr): ${Object.values(alliances).length}`);

  const parties: Record<GbrPartyCode, Party> = {
    cp: await prisma.party.create({
      data: {
        code: 'CP',
        color: '0087DC',
        isGoverning: true,
        lowHouseSeats: 365,
        name: {
          create: {
            fr: "Parti conservateur",
            en: 'Conservative Party',
            vo: "Conservative Party",
          },
        },
        ideology: {
          create: {
            economy: EconomicIdeology.NEOLIB,
            social: SocialIdeology.CONSERVATIVE,
            family: IdeologicFamily.CONVENTIONAL_RIGHT,
          },
        },
        country: {
          connect: { id: countryId },
        },
      },
    }),
  };

  console.log(`INSERT parties (gbr): ${Object.values(parties).length}`);

  return { parties, alliances: {} };
}

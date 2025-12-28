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

export type FraPartyCode = 're' | 'modem' | 'hor' | 'prv' | 'ec' | 'fp' | 'lr' | 'udi'  | 'rn' | 'rec' | 'lfi' | 'ps' | 'pcf' | 'eelv' | 'gs';
export type FraAllianceCode = 'ens' | 'nupes' | 'udc';

export async function fraPartiesSeed(prisma: PrismaClient, countryId: number) {
  const alliances: Record<FraAllianceCode, Alliance> = {
    ens: await prisma.alliance.create({
      data: {
        code: 'ENS',
        color: 'ffeb00',
        name: {
          create: {
            fr: 'Ensemble',
            en: 'Ensemble',
            vo: 'Ensemble',
          },
        },
        lowHouseSeats: 245,
        ideology: {
          create: {
            family: IdeologicFamily.CATCH_ALL
          }
        }
      },
    }),
    nupes: await prisma.alliance.create({
      data: {
        code: 'NUPES',
        color: 'BB1840',
        name: {
          create: {
            fr: 'Nouvelle Union populaire écologique et sociale',
            en: "New Ecological and Social People's Union",
            vo: 'Nouvelle Union populaire écologique et sociale',
          },
        },
        lowHouseSeats: 131,
        ideology: {
          create: {
            family: IdeologicFamily.CONVENTIONAL_LEFT
          }
        }
      },
    }),
    udc: await prisma.alliance.create({
      data: {
        code: 'UDC',
        color: '0066CC',
        name: {
          create: {
            fr: 'Union de la droite et du centre',
            en: "Union of the Right and Centre",
            vo: 'Union de la droite et du centre',
          },
        },
        lowHouseSeats: 71,
        ideology: {
          create: {
            family: IdeologicFamily.CONVENTIONAL_RIGHT
          }
        }
      },
    })
  };

  console.log(`INSERT alliances (fra): ${Object.values(alliances).length}`);

  const parties: Record<FraPartyCode, Party> = {
    re: await prisma.party.create({
      data: {
        code: 'RE',
        founded: new Date('2016-04-06'),
        color: 'ffeb00',
        isGoverning: true,
        lowHouseSeats: 156,
        name: {
          create: {
            fr: "Renaissance",
            en: 'Renaissance',
            vo: "Renaissance",
          },
        },
        ideology: {
          create: {
            economy: EconomicIdeology.NEOLIB,
            family: IdeologicFamily.CATCH_ALL,
          },
        },
        country: {
          connect: { id: countryId },
        },
        alliance: {
          connect: alliances.ens,
        },
      },
    }),
    modem: await prisma.party.create({
      data: {
        code: 'MoDem',
        founded: new Date('2007-05-10'),
        color: 'ff9900',
        isGoverning: true,
        lowHouseSeats: 49,
        name: {
          create: {
            fr: "Mouvement démocrate",
            en: 'Democratic Movement',
            vo: "Mouvement démocrate",
          },
        },
        ideology: {
          create: {
            economy: EconomicIdeology.LIBERAL,
            family: IdeologicFamily.CENTRE,
          },
        },
        country: {
          connect: { id: countryId },
        },
        alliance: {
          connect: alliances.ens,
        },
      },
    }),
    hor: await prisma.party.create({
      data: {
        code: 'HOR',
        color: '0000B9',
        isGoverning: true,
        lowHouseSeats: 28,
        name: {
          create: {
            fr: "Horizons",
            en: 'Horizons',
            vo: "Horizons",
          },
        },
        ideology: {
          create: {
            economy: EconomicIdeology.LIBERAL,
            family: IdeologicFamily.CONVENTIONAL_RIGHT,
          },
        },
        country: {
          connect: { id: countryId },
        },
        alliance: {
          connect: alliances.ens,
        },
      },
    }),
    prv: await prisma.party.create({
      data: {
        code: 'PRV',
        color: '1960AB',
        isGoverning: false,
        isSupportingGov: true,
        lowHouseSeats: 6,
        name: {
          create: {
            fr: "Parti radical",
            en: 'Radical Party',
            vo: "Parti radical",
          },
        },
        ideology: {
          create: {
            economy: EconomicIdeology.LIBERAL,
            family: IdeologicFamily.CONVENTIONAL_RIGHT,
          },
        },
        country: {
          connect: { id: countryId },
        },
        alliance: {
          connect: alliances.ens,
        },
      },
    }),
    ec: await prisma.party.create({
      data: {
        code: 'EC',
        color: '105099',
        isGoverning: false,
        isSupportingGov: true,
        lowHouseSeats: 4,
        name: {
          create: {
            fr: "En commun",
            en: 'En commun',
            vo: "En commun",
          },
        },
        ideology: {
          create: {
            economy: EconomicIdeology.LIBERAL,
            family: IdeologicFamily.CENTRE,
          },
        },
        country: {
          connect: { id: countryId },
        },
        alliance: {
          connect: alliances.ens,
        },
      },
    }),
    fp: await prisma.party.create({
      data: {
        code: 'FP',
        color: '42004E',
        isGoverning: false,
        isSupportingGov: true,
        lowHouseSeats: 2,
        name: {
          create: {
            fr: "Fédération progressiste",
            en: 'Progressive Federation',
            vo: "Fédération progressiste",
          },
        },
        ideology: {
          create: {
            family: IdeologicFamily.CENTRE,
          },
        },
        country: {
          connect: { id: countryId },
        },
        alliance: {
          connect: alliances.ens,
        },
      },
    }),
    rn: await prisma.party.create({
      data: {
        code: 'RN',
        color: '0D378A',
        lowHouseSeats: 89,
        name: {
          create: {
            fr: "Rassemblement national",
            en: 'National Rally',
            vo: "Rassemblement national",
          },
        },
        ideology: {
          create: {
            family: IdeologicFamily.FAR_RIGHT,
          },
        },
        country: {
          connect: { id: countryId },
        },
      },
    }),
    lr: await prisma.party.create({
      data: {
        code: 'LR',
        color: '0D378A',
        lowHouseSeats: 61,
        name: {
          create: {
            fr: "Les Républicains",
            en: 'The Republicans',
            vo: "Les Républicains",
          },
        },
        ideology: {
          create: {
            family: IdeologicFamily.CONVENTIONAL_RIGHT,
          },
        },
        country: {
          connect: { id: countryId },
        },
        alliance: {
          connect: alliances.udc,
        },
      },
    }),
    udi: await prisma.party.create({
      data: {
        code: 'LR',
        color: '35A2EF',
        lowHouseSeats: 6,
        name: {
          create: {
            fr: "Union des démocrates et indépendants",
            en: 'Union of Democrats and Independents',
            vo: "Union des démocrates et indépendants",
          },
        },
        ideology: {
          create: {
            family: IdeologicFamily.CONVENTIONAL_RIGHT,
          },
        },
        country: {
          connect: { id: countryId },
        },
        alliance: {
          connect: alliances.udc,
        },
      },
    }),
    rec: await prisma.party.create({
      data: {
        code: 'REC',
        color: '404040',
        lowHouseSeats: 0,
        name: {
          create: {
            fr: "Reconquête",
            en: 'Reconquête',
            vo: "Reconquête",
          },
        },
        ideology: {
          create: {
            family: IdeologicFamily.FAR_RIGHT,
          },
        },
        country: {
          connect: { id: countryId },
        },
      },
    }),
    lfi: await prisma.party.create({
      data: {
        code: 'LFI',
        color: 'E93C3C',
        lowHouseSeats: 72,
        name: {
          create: {
            fr: "La France insoumise",
            en: 'La France insoumise',
            vo: "La France insoumise",
          },
        },
        ideology: {
          create: {
            family: IdeologicFamily.CONVENTIONAL_LEFT,
          },
        },
        country: {
          connect: { id: countryId },
        },
      },
    }),
    eelv: await prisma.party.create({
      data: {
        code: 'EELV',
        color: '00c000',
        lowHouseSeats: 15,
        name: {
          create: {
            fr: "Europe Écologie Les Verts",
            en: 'Europe Ecology – The Greens',
            vo: "Europe Écologie Les Verts",
          },
        },
        ideology: {
          create: {
            family: IdeologicFamily.CONVENTIONAL_LEFT,
          },
        },
        country: {
          connect: { id: countryId },
        },
      },
    }),
    ps: await prisma.party.create({
      data: {
        code: 'PS',
        color: 'ED1651',
        lowHouseSeats: 28,
        name: {
          create: {
            fr: "Parti socialiste",
            en: 'Socialist Party',
            vo: "Parti socialiste",
          },
        },
        ideology: {
          create: {
            family: IdeologicFamily.THIRD_WAY,
          },
        },
        country: {
          connect: { id: countryId },
        },
      },
    }),
    pcf: await prisma.party.create({
      data: {
        code: 'PCF',
        color: 'dd0000',
        lowHouseSeats: 12,
        name: {
          create: {
            fr: "Parti communiste français",
            en: 'French Communist Party',
            vo: "Parti communiste français",
          },
        },
        ideology: {
          create: {
            family: IdeologicFamily.RADICAL_LEFT,
          },
        },
        country: {
          connect: { id: countryId },
        },
      },
    }),
    gs: await prisma.party.create({
      data: {
        code: 'Gs',
        color: 'dd0000',
        lowHouseSeats: 4,
        name: {
          create: {
            fr: "Génération.s",
            en: 'Génération.s',
            vo: "Génération.s",
          },
        },
        ideology: {
          create: {
            family: IdeologicFamily.CONVENTIONAL_LEFT,
          },
        },
        country: {
          connect: { id: countryId },
        },
      },
    }),
  };

  console.log(`INSERT parties (fra): ${Object.values(parties).length}`);

  return { parties, alliances };
}

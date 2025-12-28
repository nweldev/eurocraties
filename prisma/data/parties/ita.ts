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

export type ItaPartyCode = 'fdi' | 'lega' | 'fi' | 'nm' | 'ie' | 'pd' | 'avs' | 'plusEu' | 'ic' | 'm5s' | 'az' | 'iv';
export type ItaAllianceCode = 'cdx' | 'csx' | 'aziv' | 'up';

export async function itaPartiesSeed(prisma: PrismaClient, countryId: number) {
  const alliances: Record<ItaAllianceCode, Alliance> = {
    cdx: await prisma.alliance.create({
      data: {
        code: 'CDX',
        name: {
          create: {
            fr: 'Coalition de centre droit',
            en: 'Centre-right coalition',
            vo: 'coalizione di centro-destra',
          },
        },
        ideology: {
          create: {
            family: IdeologicFamily.FAR_RIGHT
          }
        }
      },
    }),
    csx: await prisma.alliance.create({
      data: {
        code: 'CSX',
        name: {
          create: {
            fr: 'Action – Italia Viva',
            en: 'Action – Italia Viva',
            vo: 'Azione – Italia Viva',
          },
        },
        ideology: {
          create: {
            family: IdeologicFamily.CONVENTIONAL_LEFT
          }
        }
      },
    }),
    aziv: await prisma.alliance.create({
      data: {
        code: 'Az-IV',
        name: {
          create: {
            fr: 'Coalition de centre gauche',
            en: 'Centre-left coalition',
            vo: 'coalizione di centro-sinistra',
          },
        },
        ideology: {
          create: {
            family: IdeologicFamily.CENTRE
          }
        }
      },
    }),
    up: await prisma.alliance.create({
      data: {
        code: 'UP',
        name: {
          create: {
            fr: 'Union populaire',
            en: "People's Union",
            vo: 'Unione Popolare',
          },
        },
        ideology: {
          create: {
            family: IdeologicFamily.RADICAL_LEFT
          }
        }
      },
    }),
  };

  console.log(`INSERT alliances (ita): ${Object.values(alliances).length}`);

  const parties: Record<ItaPartyCode, Party> = {
    fdi: await prisma.party.create({
      data: {
        code: 'FdI',
        founded: new Date('2012-12-28'),
        color: '003397',
        isGoverning: true,
        lowHouseSeats: 119,
        name: {
          create: {
            fr: "Frères d'Italie",
            en: 'Brothers of Italy',
            vo: "Fratelli d'Italia",
          },
        },
        ideology: {
          create: {
            economy: EconomicIdeology.NEOLIB,
            social: SocialIdeology.DECLINIST,
            national: NationalIdeology.NATIONALIST,
            family: IdeologicFamily.FAR_RIGHT,
            sources: {
              create: {
                economy: [
                  'https://www.mediapart.fr/journal/international/210522/en-italie-la-post-fasciste-giorgia-meloni-cherche-faire-oublier-ses-racines',
                ],
                social: ['https://youtu.be/xxGRkTQ3c5Q?si=RUG2M1o6kjx_uMyu'],
                national: ['https://www.nbcnews.com/news/world/italy-s-salvini-calls-elections-raises-possibility-far-right-rule-n1040701'],
              },
            },
          },
        },
        country: {
          connect: { id: countryId },
        },
        alliance: {
          connect: alliances.cdx,
        },
      },
    }),
    lega: await prisma.party.create({
      data: {
        code: 'Lega',
        founded: new Date('1989-12-04'),
        color: '008000',
        isGoverning: true,
        lowHouseSeats: 66,
        name: {
          create: {
            fr: 'Ligue',
            en: 'League',
            vo: 'Lega',
          },
        },
        ideology: {
          create: {
            social: SocialIdeology.DECLINIST,
            national: NationalIdeology.NATIONALIST,
            family: IdeologicFamily.FAR_RIGHT,
          },
        },
        country: {
          connect: { id: countryId },
        },
        alliance: {
          connect: alliances.cdx,
        },
      },
    }),
    fi: await prisma.party.create({
      data: {
        code: 'FI',
        founded: new Date('1994-01-18'),
        color: '0087DC',
        isGoverning: true,
        lowHouseSeats: 45,
        name: {
          create: {
            fr: 'Forza Italia',
            en: 'Forza Italia',
            vo: 'Forza Italia',
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
        alliance: {
          connect: alliances.cdx,
        },
      },
    }),
    nm: await prisma.party.create({
      data: {
        code: 'NM',
        founded: new Date('2022-08-11'),
        color: '5683B3',
        isGoverning: false,
        lowHouseSeats: 7,
        name: {
          create: {
            fr: 'Nous, modérés',
            en: 'Us Moderates',
            vo: 'Noi moderati',
          },
        },
        ideology: {
          create: {
            economy: EconomicIdeology.NEOLIB,
            social: SocialIdeology.CONSERVATIVE,
            family: IdeologicFamily.CONVENTIONAL_RIGHT,
            religion: Religion.CONVENTIONAL_CHRISTIAN,
          },
        },
        country: {
          connect: { id: countryId },
        },
        alliance: {
          connect: alliances.cdx,
        },
      },
    }),
    pd: await prisma.party.create({
      data: {
        code: 'PD',
        founded: new Date('2007-10-14'),
        color: 'EF1C27',
        isGoverning: false,
        lowHouseSeats: 69,
        name: {
          create: {
            fr: 'Parti démocrate',
            en: 'Democratic Party',
            vo: 'Partito Democratico',
          },
        },
        ideology: {
          create: {
            economy: EconomicIdeology.NEOLIB,
            social: SocialIdeology.NEUTRAL,
            family: IdeologicFamily.THIRD_WAY,
            religion: Religion.CONVENTIONAL_CHRISTIAN,
            sources: {
              create: {
                economy: ['https://www.economie.gouv.fr/igpde-editions-publications/note-reactive-italie-2014-3'],
              },
            },
          },
        },
        country: {
          connect: { id: countryId },
        },
        alliance: {
          connect: alliances.csx,
        },
      },
    }),
    avs: await prisma.party.create({
      data: {
        code: 'AVS',
        founded: new Date('2022-07-02'),
        color: 'BD3758',
        isGoverning: false,
        lowHouseSeats: 12,
        name: {
          create: {
            fr: 'Alliance verts et gauche',
            en: 'Greens and Left Alliance',
            vo: 'Alleanza Verdi e Sinistra',
          },
        },
        ideology: {
          create: {
            // see Joseph E. Stiglitz / neo-keynesianism
            economy: EconomicIdeology.CONVENTIONAL_INTERVENTIONIST,
            social: SocialIdeology.PROGRESSIVE,
            family: IdeologicFamily.CONVENTIONAL_LEFT,
          },
        },
        country: {
          connect: { id: countryId },
        },
        alliance: {
          connect: alliances.csx,
        },
      },
    }),
    plusEu: await prisma.party.create({
      data: {
        code: '+EU',
        founded: new Date('2017-11-23'),
        color: 'FFD700',
        isGoverning: false,
        lowHouseSeats: 2,
        name: {
          create: {
            fr: '+Europa',
            en: '+Europa',
            vo: '+Europa',
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
          connect: alliances.csx,
        },
      },
    }),
    ic: await prisma.party.create({
      data: {
        code: 'IC',
        founded: new Date('2022-08-01'),
        color: '00938F',
        isGoverning: false,
        lowHouseSeats: 1,
        name: {
          create: {
            fr: 'Engagement civique',
            en: 'Civic Commitment',
            vo: 'Impegno Civico',
          },
        },
        ideology: {
          create: {
            family: IdeologicFamily.CENTRE,
            religion: Religion.CONVENTIONAL_CHRISTIAN
          },
        },
        country: {
          connect: { id: countryId },
        },
        alliance: {
          connect: alliances.csx,
        },
      },
    }),
    ie: await prisma.party.create({
      data: {
        code: 'IE',
        founded: new Date('2020-07-23'),
        color: '366A9F',
        isGoverning: false,
        lowHouseSeats: 0,
        name: {
          create: {
            fr: 'Italexit',
            en: 'Italexit',
            vo: 'Italexit',
          },
        },
        ideology: {
          create: {
            social: SocialIdeology.CONSERVATIVE,
            family: IdeologicFamily.FAR_RIGHT,
            national: NationalIdeology.ECONOMIC_NATIONALIST,
            sources: {
              create: {
                family: [
                  'https://www-lanazione-it.translate.goog/pistoia/politica/italexit-dimissioni-1.8080459?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=wapp&_x_tr_hist=true',
                ],
              },
            },
          },
        },
        country: {
          connect: { id: countryId },
        },
        alliance: {
          connect: alliances.cdx,
        },
      },
    }),
    m5s: await prisma.party.create({
      data: {
        code: 'M5S',
        founded: new Date('2009-10-04'),
        color: 'FFEB3B',
        isGoverning: false,
        lowHouseSeats: 53,
        name: {
          create: {
            fr: 'Mouvement 5 étoiles',
            en: 'Five Star Movement',
            vo: 'Movimento 5 Stelle',
          },
        },
        ideology: {
          create: {
            family: IdeologicFamily.CATCH_ALL,
          },
        },
        country: {
          connect: { id: countryId },
        },
      },
    }),
    az: await prisma.party.create({
      data: {
        code: 'Az',
        founded: new Date('2019-01-18'),
        color: '003399',
        isGoverning: false,
        lowHouseSeats: 12,
        name: {
          create: {
            fr: 'Action',
            en: 'Action',
            vo: 'Azione',
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
          connect: alliances.aziv,
        },
      },
    }),
    iv: await prisma.party.create({
      data: {
        code: 'IV',
        founded: new Date('2019-09-25'),
        color: 'CC3C84',
        isGoverning: false,
        lowHouseSeats: 9,
        name: {
          create: {
            fr: 'Italia Viva',
            en: 'Italia Viva',
            vo: 'Italia Viva',
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
          connect: alliances.aziv,
        },
      },
    })
  };

  console.log(`INSERT parties (ita): ${Object.values(parties).length}`);

  return { parties, alliances };
}

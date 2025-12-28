import { Countrie, PrismaClient } from '@prisma/client';

export type CountryCode =
  | 'che'
  | 'isl'
  | 'nor'
  | 'gbr'
  | 'alb'
  | 'bih'
  | 'srb'
  | 'mkd'
  | 'mne'
  | 'xxd'
  | 'aut'
  | 'cze'
  | 'deu'
  | 'dnk'
  | 'est'
  | 'fin'
  | 'grc'
  | 'irl'
  | 'ita'
  | 'ltu'
  | 'lva'
  | 'pol'
  | 'svk'
  | 'svn'
  | 'swe'
  | 'nld'
  | 'esp'
  | 'fra'
  | 'bel'
  | 'prt'
  | 'cyp'
  | 'lux'
  | 'hrv'
  | 'rou'
  | 'hun'
  | 'bgr';

export async function countriesSeed(prisma: PrismaClient) {
  const countries: Record<CountryCode, Countrie> = {
    che: await prisma.countrie.create({
      data: {
        code: 'che',
        hasHighHouse: true,
        lowHouseSeats: 200,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Suisse', en: 'Switzerland', vo: 'Schweiz' } },
      },
    }),
    isl: await prisma.countrie.create({
      data: {
        code: 'isl',
        hasHighHouse: false,
        lowHouseSeats: 63,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Islande', en: 'Iceland', vo: 'Ísland' } },
      },
    }),
    nor: await prisma.countrie.create({
      data: {
        code: 'nor',
        hasHighHouse: false,
        lowHouseSeats: 169,
        isMonarchy: true,
        isPresidential: false,
        name: { create: { fr: 'Norvège', en: 'Norway', vo: 'Norge' } },
      },
    }),
    gbr: await prisma.countrie.create({
      data: {
        code: 'gbr',
        hasHighHouse: true,
        lowHouseSeats: 650,
        isMonarchy: true,
        isPresidential: false,
        name: { create: { fr: 'Royaume-Uni', en: 'United Kingdom', vo: 'United Kingdom' } },
      },
    }),
    alb: await prisma.countrie.create({
      data: {
        code: 'alb',
        hasHighHouse: false,
        lowHouseSeats: 140,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Albanie', en: 'Albania', vo: 'Shqipëria' } },
      },
    }),
    bih: await prisma.countrie.create({
      data: {
        code: 'bih',
        hasHighHouse: true,
        lowHouseSeats: 42,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Bosnie-Herzégovine', en: 'Bosnia and Herzegovina', vo: 'Bosna i Hercegovina' } },
      },
    }),
    srb: await prisma.countrie.create({
      data: {
        code: 'srb',
        hasHighHouse: false,
        lowHouseSeats: 250,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Serbie', en: 'Serbia', vo: 'Srbija' } },
      },
    }),
    mkd: await prisma.countrie.create({
      data: {
        code: 'mkd',
        hasHighHouse: false,
        lowHouseSeats: 120,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Macédoine du Nord', en: 'North Macedonia', vo: 'Severna Makedonija' } },
      },
    }),
    mne: await prisma.countrie.create({
      data: {
        code: 'mne',
        hasHighHouse: false,
        lowHouseSeats: 81,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Monténégro', en: 'Montenegro', vo: 'Crna Gora' } },
      },
    }),
    xxd: await prisma.countrie.create({
      data: {
        code: 'xxd',
        hasHighHouse: false,
        lowHouseSeats: 120,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Kosovo', en: 'Kosovo', vo: 'Kosova' } },
      },
    }),
    aut: await prisma.countrie.create({
      data: {
        code: 'aut',
        hasHighHouse: true,
        lowHouseSeats: 183,
        isMonarchy: false,
        isPresidential: true,
        name: { create: { fr: 'Autriche', en: 'Austria', vo: 'Österreich' } },
      },
    }),
    cze: await prisma.countrie.create({
      data: {
        code: 'cze',
        hasHighHouse: true,
        lowHouseSeats: 200,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Tchéquie', en: 'Czechia', vo: 'Česko' } },
      },
    }),
    deu: await prisma.countrie.create({
      data: {
        code: 'deu',
        hasHighHouse: true,
        lowHouseSeats: 736,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Allemagne', en: 'Germany', vo: 'Deutschland' } },
      },
    }),
    dnk: await prisma.countrie.create({
      data: {
        code: 'dnk',
        hasHighHouse: false,
        lowHouseSeats: 179,
        isMonarchy: true,
        isPresidential: false,
        name: { create: { fr: 'Danemark', en: 'Denmark', vo: 'Danmark' } },
      },
    }),
    est: await prisma.countrie.create({
      data: {
        code: 'est',
        hasHighHouse: false,
        lowHouseSeats: 101,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Estonie', en: 'Estonia', vo: 'Eesti' } },
      },
    }),
    fin: await prisma.countrie.create({
      data: {
        code: 'fin',
        hasHighHouse: false,
        lowHouseSeats: 200,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Finlande', en: 'Finland', vo: 'Suomi' } },
      },
    }),
    grc: await prisma.countrie.create({
      data: {
        code: 'grc',
        hasHighHouse: false,
        lowHouseSeats: 300,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Grèce', en: 'Greece', vo: 'Elláda' } },
      },
    }),
    irl: await prisma.countrie.create({
      data: {
        code: 'irl',
        hasHighHouse: true,
        lowHouseSeats: 160,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Irlande', en: 'Ireland', vo: 'Éire' } },
      },
    }),
    ita: await prisma.countrie.create({
      data: {
        code: 'ita',
        hasHighHouse: true,
        lowHouseSeats: 400,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Italie', en: 'Italy', vo: 'Italia' } },
      },
    }),
    ltu: await prisma.countrie.create({
      data: {
        code: 'ltu',
        hasHighHouse: false,
        lowHouseSeats: 141,
        isMonarchy: false,
        isPresidential: true,
        name: { create: { fr: 'Lituanie', en: 'Lithuania', vo: 'Lietuva' } },
      },
    }),
    lva: await prisma.countrie.create({
      data: {
        code: 'lva',
        hasHighHouse: false,
        lowHouseSeats: 100,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Lettonie', en: 'Latvia', vo: 'Latvija' } },
      },
    }),
    pol: await prisma.countrie.create({
      data: {
        code: 'pol',
        hasHighHouse: true,
        lowHouseSeats: 460,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Pologne', en: 'Poland', vo: 'Polska' } },
      },
    }),
    svk: await prisma.countrie.create({
      data: {
        code: 'svk',
        hasHighHouse: false,
        lowHouseSeats: 150,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Slovaquie', en: 'Slovakia', vo: 'Slovensko' } },
      },
    }),
    svn: await prisma.countrie.create({
      data: {
        code: 'svn',
        hasHighHouse: true,
        lowHouseSeats: 90,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Slovénie', en: 'Slovenia', vo: 'Slovenija' } },
      },
    }),
    swe: await prisma.countrie.create({
      data: {
        code: 'swe',
        hasHighHouse: false,
        lowHouseSeats: 349,
        isMonarchy: true,
        isPresidential: false,
        name: { create: { fr: 'Suède', en: 'Sweden', vo: 'Sverige' } },
      },
    }),
    nld: await prisma.countrie.create({
      data: {
        code: 'nld',
        hasHighHouse: true,
        lowHouseSeats: 150,
        isMonarchy: true,
        isPresidential: false,
        name: { create: { fr: 'Pays-Bas', en: 'Netherlands', vo: 'Nederland' } },
      },
    }),
    esp: await prisma.countrie.create({
      data: {
        code: 'esp',
        hasHighHouse: true,
        lowHouseSeats: 350,
        isMonarchy: true,
        isPresidential: false,
        name: { create: { fr: 'Espagne', en: 'Spain', vo: 'España' } },
      },
    }),
    fra: await prisma.countrie.create({
      data: {
        code: 'fra',
        hasHighHouse: true,
        lowHouseSeats: 577,
        isMonarchy: false,
        isPresidential: true,
        name: { create: { fr: 'France', en: 'France', vo: 'France' } },
      },
    }),
    bel: await prisma.countrie.create({
      data: {
        code: 'bel',
        hasHighHouse: true,
        lowHouseSeats: 150,
        isMonarchy: true,
        isPresidential: false,
        name: { create: { fr: 'Belgique', en: 'Belgium', vo: 'Belgique' } },
      },
    }),
    prt: await prisma.countrie.create({
      data: {
        code: 'prt',
        hasHighHouse: false,
        lowHouseSeats: 230,
        isMonarchy: false,
        isPresidential: true,
        name: { create: { fr: 'Portugal', en: 'Portugal', vo: 'Portugal' } },
      },
    }),
    cyp: await prisma.countrie.create({
      data: {
        code: 'cyp',
        hasHighHouse: false,
        lowHouseSeats: 56,
        isMonarchy: false,
        isPresidential: true,
        name: { create: { fr: 'Chypre', en: 'Cyprus', vo: 'Kýpros' } },
      },
    }),
    lux: await prisma.countrie.create({
      data: {
        code: 'lux',
        hasHighHouse: false,
        lowHouseSeats: 60,
        isMonarchy: true,
        isPresidential: false,
        name: { create: { fr: 'Luxembourg', en: 'Luxembourg', vo: 'Lëtzebuerg' } },
      },
    }),
    hrv: await prisma.countrie.create({
      data: {
        code: 'hrv',
        hasHighHouse: false,
        lowHouseSeats: 151,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Croatie', en: 'Croatia', vo: 'Hrvatska' } },
      },
    }),
    rou: await prisma.countrie.create({
      data: {
        code: 'rou',
        hasHighHouse: false,
        lowHouseSeats: 330,
        isMonarchy: false,
        isPresidential: true,
        name: { create: { fr: 'Roumanie', en: 'Romania', vo: 'România' } },
      },
    }),
    hun: await prisma.countrie.create({
      data: {
        code: 'hun',
        hasHighHouse: false,
        lowHouseSeats: 199,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Hongrie', en: 'Hungary', vo: 'Magyarország' } },
      },
    }),
    bgr: await prisma.countrie.create({
      data: {
        code: 'bgr',
        hasHighHouse: false,
        lowHouseSeats: 240,
        isMonarchy: false,
        isPresidential: false,
        name: { create: { fr: 'Bulgarie', en: 'Bulgaria', vo: 'Bylgarija' } },
      },
    }),
  };

  console.log(`INSERT countries: ${Object.values(countries).length}`)
  return countries;
}

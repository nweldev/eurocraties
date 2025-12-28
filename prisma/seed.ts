import { Alliance, Party, Prisma, PrismaClient } from '@prisma/client';
import { CountryCode, countriesSeed } from './data/countries.ts';
import { partiesSeed } from './data/parties/index.ts';
import { electionsSeed } from './data/elections/index.ts';
import { deleteAll } from './data/_helpers/deleteAll.ts';

const prisma = new PrismaClient();

async function main() {
  // TODO: (once all required data has been gathered)
  // use upsert instead of delete and create
  await deleteAll(prisma);

  console.log(`\n--- countries ---\n`)
  const countries = await countriesSeed(prisma);
  console.log(`\n--- parties ---\n`)
  const partiesAndAlliances = await partiesSeed(prisma, countries);
  console.log(`\n--- elections ---\n`)
  await electionsSeed(
    prisma,
    countries,
    partiesAndAlliances as Record<CountryCode, { parties: Record<string, Party>; alliances: Record<string, Alliance> }>
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('\nDONE')
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

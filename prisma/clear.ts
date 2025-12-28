import { PrismaClient } from '@prisma/client';
import { deleteAll } from './data/_helpers/deleteAll.ts';

const prisma = new PrismaClient();


async function main() {
  await deleteAll(prisma);
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
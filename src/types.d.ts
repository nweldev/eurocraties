import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

type PropsWithDictionary<P = unknown, D = unknown> = P & { dictionary: D };

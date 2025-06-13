import { PrismaClient } from '@prisma/client';
import 'server-only';

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient;
}

const prismaClientSingleton = () => {
  try {
    return new PrismaClient({
      log:
        process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });
  } catch (error) {
    throw error;
  }
};

const globalForPrisma = globalThis as unknown as {
  cachedPrisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.cachedPrisma ?? prismaClientSingleton();

export const db = prisma;

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.cachedPrisma = prisma;

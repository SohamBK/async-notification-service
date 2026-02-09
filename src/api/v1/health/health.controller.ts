import { prisma } from '../../../db/prisma';

export async function liveness() {
  return { status: 'alive' };
}

export async function readiness() {
  // Check DB connectivity
  await prisma.$queryRaw`SELECT 1`;
  return { status: 'ready' };
}

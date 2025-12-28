import { Prisma, PrismaClient } from '@prisma/client';

const deleteLog = (table: string, payload: Prisma.BatchPayload) => console.log(`DELETE FROM ${table}: ${payload.count}`);

export async function deleteAll(prisma: PrismaClient) {
  let payload: Prisma.BatchPayload;
  payload = await prisma.party.deleteMany();
  deleteLog('party', payload);
  payload = await prisma.partyName.deleteMany();
  deleteLog('partyName', payload);
  payload = await prisma.countrie.deleteMany();
  deleteLog('countrie', payload);
  payload = await prisma.countrieName.deleteMany();
  deleteLog('countrieName', payload);
  payload = await prisma.electionRslt.deleteMany();
  deleteLog('electionRslt', payload);
  payload = await prisma.candidate.deleteMany();
  deleteLog('candidate', payload);
  payload = await prisma.election.deleteMany();
  deleteLog('election', payload);
  payload = await prisma.alliance.deleteMany();
  deleteLog('alliance', payload);
  payload = await prisma.ideologySources.deleteMany();
  deleteLog('ideologySources', payload);
  payload = await prisma.ideology.deleteMany();
  deleteLog('ideology', payload);
}

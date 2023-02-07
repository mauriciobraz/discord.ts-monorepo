import 'dotenv/config';
import 'reflect-metadata';

import { PrismaClient } from '@discord.ts-monorepo/database';
import { Client, DIService, typeDiDependencyRegistryEngine } from 'discordx';
import { readdir } from 'fs/promises';
import { resolve } from 'path';
import Container, { Service } from 'typedi';

import { DISCORD_TOKEN, NODE_ENV } from './utils/process-env';

export default async function main() {
  DIService.engine = typeDiDependencyRegistryEngine
    .setInjector(Container)
    .setService(Service);

  await initializeDatabase();
  await initializeClient();
}

/** @internal Initialize the Prisma database. */
async function initializeDatabase() {
  const prisma = new PrismaClient();
  await prisma.$connect();

  Container.set(PrismaClient, prisma);
}

/** @internal Initialize the client and login to Discord. */
async function initializeClient() {
  const client = new Client({
    botGuilds: NODE_ENV === 'DEVELOPMENT' ? [getAllGuildsId] : undefined,
    intents: [],
  });

  await importFolderRecursively(resolve(__dirname, 'modules'));
  await client.login(DISCORD_TOKEN);
}

/** @internal Get all guilds and returns their IDs. */
async function getAllGuildsId(client: Client) {
  const guilds = await client.guilds.fetch();
  return guilds.map((guild) => guild.id);
}

/** @internal Recursively imports all files from a folder and its subfolders. */
async function importFolderRecursively(path: string) {
  const entries = await readdir(path, { withFileTypes: true });

  const files = entries
    .filter((file) => !file.isDirectory())
    .map((file) => ({ ...file, path: resolve(path, file.name) }));

  for await (const folder of entries.filter((folder) => folder.isDirectory())) {
    await importFolderRecursively(resolve(path, folder.name));
  }

  return await Promise.all(files.map(async (file) => await import(file.path)));
}

if (require.main === module) {
  main();
}

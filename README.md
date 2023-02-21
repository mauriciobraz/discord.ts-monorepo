# DiscordTsMonorepo

This monorepo contains a Discord bot built with discord.js and discordx, featuring decorator support and localization with typesafe-i18n. For the web application, it uses Next.js, SWR and Tailwind CSS.

## Why?

I wanted to learn about monorepos and how to use them. I chose to use [pnpm](https://pnpm.io/) as the package manager and [turbo](https://turbo.build/) as the build tool because of their speed and simplicity.

## Applications

For more information about some of the apps, see their `README` files.

### [@discord.ts-monorepo/client](./apps/client/README.md)

The client is a powerful Discord bot built using [Discord.js](https://discord.js.org/). It also has a localization system built-in using [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n) and a command handler using [discordx](https://github.com/discordx-ts/discordx).

### [@discord.ts-monorepo/web](./apps/web/README.md)

The web application is a [Next.js](https://nextjs.org/) application that is used to interact with the Discord API. It is written in TypeScript and uses [SWR](https://swr.vercel.app/) for data fetching and [Tailwind CSS](https://tailwindcss.com/) for styling.

## Packages

### [@discord.ts-monorepo/database](./packages/database)

This package contains a [Prisma](https://www.prisma.io/) schema and client for the database that can be shared between all applications.

### [@discord.ts-monorepo/tsconfig](./packages/tsconfig)

This package contains some common TypeScript configurations files (`tsconfig.json`).

## How to use

```bash
# Clone the repository
git clone

# Install dependencies
pnpm install

# Build the packages
pnpm build
```

## Docker Support

This template is also configured to run in a Docker container using [Docker Compose](https://docs.docker.com/compose/). To run the bot in a container, fill all the `.env` files with the correct values and run the following command:

```bash
docker-compose up -d
```

> **Warning**
> This is a work in progress and is not ready yet.

# DiscordTsMonorepo

This monorepo contains a Discord bot built with discord.js and discordx, featuring decorator support and localization with typesafe-i18n. For the web application, it uses Next.js, SWR and Tailwind CSS.

## Why?

I wanted to learn about monorepos and how to use them. I chose to use [pnpm](https://pnpm.io/) as the package manager and [turbo](https://turbo.build/) as the build tool because of their speed and simplicity.

## Applications

For more information about some of the apps, see their `README` files.

### [@discord.ts-monorepo/client](./packages/client/README.md)

The client is a powerful Discord bot built using [Discord.js](https://discord.js.org/). It also has a localization system built-in using [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n) and a command handler using [discordx](https://github.com/discordx-ts/discordx).

### [@discord.ts-monorepo/web](./packages/web/README.md)

The web application is a [Next.js](https://nextjs.org/) application that is used to interact with the Discord API. It is written in TypeScript and uses [SWR](https://swr.vercel.app/) for data fetching and [Tailwind CSS](https://tailwindcss.com/) for styling.

## Packages

### [@discord.ts-monorepo/database](./packages/database/README.md)

This package contains a [Prisma](https://www.prisma.io/) schema and client for the database that can be shared between all applications.

### [@discord.ts-monorepo/tsconfig](./packages/tsconfig/README.md)

This package contains some common TypeScript configurations files (`tsconfig.json`).

## How to use

### Clone the repository

```bash
git clone
```

### Install dependencies

```bash
pnpm install
```

### Build the packages

```bash
pnpm build
```

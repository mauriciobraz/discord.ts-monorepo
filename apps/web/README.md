# @discord.ts-monorepo/web

This is the web application of the discord.ts monorepo. It is a Next.js application, which is using [SWR](https://swr.vercel.app/) for data fetching and [Tailwind CSS](https://tailwindcss.com/) for styling.

## Configuration

Clone the `.env.example` file and rename it to `.env`. Then, fill in the required fields:

```bash
cp .env.example .env
```

- `NEXT_PUBLIC_DISCORD_API_BASE_URL`: Base URL for the Discord API.
- `DISCORD_CLIENT_ID`: OAuth2 client ID for your Discord application.
- `DISCORD_CLIENT_SECRET`: OAuth2 client secret for your Discord application.
- [`NEXTAUTH_SECRET`](https://next-auth.js.org/configuration/options#nextauth_secret): Used to sign the session cookie.
- [`NEXTAUTH_URL`](https://next-auth.js.org/configuration/options#nextauth_url): URL of the NextAuth.js API.

> **Note**
> You can get your Discord application's client ID and secret from the [Discord Developer Portal](https://discord.com/developers/applications).

## Development

```bash
pnpm dev
```

## Production

```bash
pnpm build
pnpm start
```

## Hooks

### [`useSWRDiscordApi`](./src/hooks/useSWRDiscordApi.ts)

This hook is used to fetch data from the Discord API. It is a wrapper around [`useSWR`](https://swr.vercel.app/docs/use-swr) that automatically adds the `Authorization` header to the request and type-safety for the options and response.

```ts
import { useSWRDiscordApi } from "src/hooks/useSWRDiscordApi";
import type { GetGuildsResponse } from "discord-api-types/v9";

const [data, error, isLoading] =
  useSWRDiscordApi<GetGuildsResponse>("/users/@me/guilds");

// data: GetGuildsResponse | undefined
// error: Error | undefined
// isLoading: boolean
```

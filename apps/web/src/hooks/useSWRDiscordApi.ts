import { useSession } from "next-auth/react";
import useSWR from "swr";

import type {
  DiscordApiRestError,
  DiscordApiRestRoutes,
} from "../types/discord-api-types";

export type UseSWRDiscordApiResponse<T> =
  | [T, undefined, boolean]
  | [undefined, DiscordApiRestError, boolean];

/** Fetches data from the Discord API using the access token from the session. */
export function useSWRDiscordApi<T>(endpoint: DiscordApiRestRoutes) {
  const { data: session } = useSession();

  const { data, error, isLoading } = useSWR<T, DiscordApiRestError>(
    session?.accessToken ? [endpoint, session.accessToken] : null,
    fetchWithAuthHeader,
    { revalidateOnFocus: false, revalidateIfStale: false }
  );

  return [data, error, isLoading] as UseSWRDiscordApiResponse<T>;
}

/** Error for HTTP responses from the Discord API. */
export class DiscordApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly message: string,
    public readonly code: number
  ) {
    super(message);
  }
}

async function fetchWithAuthHeader([endpoint, accessToken]: [string, string]) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_DISCORD_API_BASE_URL + endpoint,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  const resJson = await res.json();

  if (!res.ok) {
    throw new DiscordApiError(res.status, resJson.message, resJson.code);
  }

  return resJson;
}

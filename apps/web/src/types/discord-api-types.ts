import type { Routes } from "discord-api-types/v9";

export interface DiscordApiRestError {
  /** @link https://discord.com/developers/docs/dispatch/error-codes */
  code: number;

  /** Readable error message. */
  message: string;
}

/** Type for every Discord API (REST and V9) route. */
export type DiscordApiRestRoutes = ReturnType<
  typeof Routes[keyof typeof Routes]
>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv {
      /** @link https://discord.com/developers/docs/topics/oauth2#authorization-code-grant */
      DISCORD_CLIENT_ID: string;

      /** @link https://discord.com/developers/docs/topics/oauth2#authorization-code-grant */
      DISCORD_CLIENT_SECRET: string;

      /** API Base URL for Discord's API */
      NEXT_PUBLIC_DISCORD_API_BASE_URL: string;
    }
  }
}

export {};

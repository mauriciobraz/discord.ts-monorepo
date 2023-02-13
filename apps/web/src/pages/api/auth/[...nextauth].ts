import NextAuth from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord";
import type { NextAuthOptions } from "next-auth";

export const NEXT_AUTH_OPTIONS = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          // Check out the docs for more info on scopes:
          // https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
          scope: "identify email guilds",
        },
      },
    }),
  ],
  // Adds the access token to the JWT so it can be accessed from the client
  // without needing to make an additional API request/database query.
  session: {
    strategy: "jwt",
    // The access token is valid for 604800 seconds (7 days).
    // https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-access-token-response
    maxAge: 604800,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) token.accessToken = account.access_token;
      if (user) token.id = user.id;

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    },
  },
} satisfies NextAuthOptions;

export default NextAuth(NEXT_AUTH_OPTIONS);

import NextAuth from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord";

export default NextAuth({
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
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) token.accessToken = account.access_token;
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

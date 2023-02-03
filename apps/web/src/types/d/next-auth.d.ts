import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  /** Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context. */
  interface Session {
    /** Oauth2 access token. */
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** Oauth2 access token. */
    accessToken?: string;
  }
}
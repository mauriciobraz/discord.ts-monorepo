import { signIn, signOut, useSession } from "next-auth/react";
import type { APIGuild, APIUser } from "discord-api-types/v9";

import UserCard from "../components/UserCard";
import { useSWRDiscordApi } from "../hooks/useSWRDiscordApi";

export default function Home() {
  const [user, userError, userIsLoading] =
    useSWRDiscordApi<APIUser>("/users/@me");

  const [userGuilds] = useSWRDiscordApi<APIGuild[]>("/users/@me/guilds");

  const isSignedIn = !!useSession().data;

  if (!isSignedIn) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-slate-900 text-white">
        <button
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          onClick={() => signIn("discord")}
        >
          Sign In
        </button>
      </div>
    );
  }

  if (isSignedIn && userIsLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-slate-900 text-white">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-slate-900 text-white">
        <pre className="max-h-[392px] overflow-y-auto rounded bg-slate-800 p-4 font-mono text-sm text-white">
          {JSON.stringify(userError, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-screen flex-row items-center justify-center gap-8 bg-slate-900 p-12 text-white">
        <UserCard user={user} guilds={userGuilds} />

        <pre className="max-h-[392px] overflow-y-auto rounded bg-slate-800 p-4 font-mono text-sm text-white">
          {JSON.stringify(user, null, 2)}
        </pre>

        <pre className="max-h-[392px] overflow-y-auto rounded bg-slate-800 p-4 font-mono text-sm text-white">
          {JSON.stringify(userGuilds, null, 2)}
        </pre>
      </div>

      <button
        className="bg-slate-600 py-2 px-4 font-bold text-white hover:bg-slate-700"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}

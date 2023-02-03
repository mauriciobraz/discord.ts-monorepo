import { APIGuild, APIUser } from "discord-api-types/v9";
import Image from "next/image";
import UnnamedImage from "./UnnamedImage";

interface UserCardProps {
  user: APIUser;
  guilds?: APIGuild[];
}

export default function UserCard({ user, guilds }: UserCardProps) {
  return (
    <div className="flex flex-col items-start justify-center gap-4">
      <div className="flex items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center gap-4">
          {user.avatar ? (
            <Image
              className="rounded-full"
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
              alt="User Avatar"
              width={124}
              height={124}
            />
          ) : (
            <UnnamedImage abbreviation={user.username.slice(0, 3)} size={124} />
          )}

          <h1 className="text-2xl font-bold">
            {user.username}
            <span className="font-normal text-slate-400">
              #{user.discriminator}
            </span>
          </h1>
        </div>

        {user.banner ? (
          <Image
            className="rounded-md"
            src={`https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png`}
            alt="User Banner"
            width={480}
            height={184}
          />
        ) : (
          <div className="flex h-[11.5rem] w-[30rem] items-center justify-center rounded-md bg-slate-800">
            <span className="text-2xl font-extrabold opacity-25">
              NO BANNER
            </span>
          </div>
        )}
      </div>

      <div className="flex max-h-48 min-w-full max-w-[636px] flex-col items-center justify-start gap-4 overflow-x-auto">
        {guilds?.map((guild) => (
          <div
            key={guild.id}
            className="flex w-full items-start gap-4 rounded-md bg-slate-800 p-4"
          >
            {guild.icon ? (
              <Image
                className="rounded-full"
                src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                alt="Guild Icon"
                width={64}
                height={64}
              />
            ) : (
              <UnnamedImage abbreviation={guild.name.slice(0, 3)} size={64} />
            )}

            <div className="flex flex-col items-start justify-start">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{guild.name}</span>

                <span
                  className={`text-xs font-bold ${
                    guild.owner ? "text-green-400" : "text-slate-400"
                  }`}
                >
                  {guild.owner ? "Owner" : "Member"}
                </span>
              </div>

              <span className="text-xs font-bold text-slate-400">
                {guild.features
                  .slice(0, 3)
                  .map((feature) =>
                    feature
                      .split("_")
                      .map((word) => word[0] + word.slice(1).toLowerCase())
                      .join(" ")
                  )
                  .join(", ")}{" "}
                and {guild.features.length - 3} more...
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

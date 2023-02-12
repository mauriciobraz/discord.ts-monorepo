# @discord.ts-monorepo/client

This is a template for creating a Discord bot with localization support. It uses the following packages to achieve this: [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n), [discord.js](https://github.com/discordjs/discord.js) and [discordx](https://github.com/discordx-ts/discordx).

## Configuration

Clone the `.env.example` file and rename it to `.env`. Then, fill in the required fields:

```bash
cp .env.example .env
```

- `NODE_ENV`: The environment in which the bot will run (`development` or `production`)

- `DISCORD_TOKEN`: Authorization token for your bot (see [here](https://discord.com/developers/docs/topics/oauth2#bots) for more information)

- `LOG_LEVEL`: Minimum log level (`debug`, `info`, `warn`, `error` or `silent`).

- `SAVE_LOGS`: Whether to save the logs to a file or not.

## How Localization Works

The localization is done using the [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n), read the documentation for more information. Basically, you can create a folder for each language you want to support, and then execute the following command to generate the types:

```bash
pnpm run typesafe-i18n
```

> **Warning**
> Make sure to always use the [Discord's locales names](https://discord.com/developers/docs/reference#locales) for the language folders, otherwise the bot won't be able to organize the translations.

### Translating Commands

There's a dedicated [namespace](https://github.com/ivanhofer/typesafe-i18n/tree/main/packages/generator#namespaces) for commands, so you can simply add the keys to his respective file.

#### [`mergeTranslations`](./src/i18n/helpers.ts) Helper

To avoid repeating spreading the main translations object, you can use the [`mergeTranslations`](./src/i18n/helpers.ts) helper, which will merge the translations with the main object. This helper is especially useful when working with large and complex internationalization projects.

**Example**

```ts
// source/i18n/%LANGUAGE%/SLASH/index.ts
import { mergeTranslations } from '../../helpers';

export default mergeTranslations('SLASH', {
  EXAMPLE_EXAMPLE_NAME: 'example',
  EXAMPLE_EXAMPLE_DESCRIPTION: 'This is a useless example command.',

  PATH_TO_ANOTHER_NAME: 'another',
  PATH_TO_ANOTHER_DESCRIPTION: 'This is another useless example command.',
});
```

### Adding Commands

The commands are located in the [`source/modules`](source/modules) folder. The way to create a command is pretty much the same as in the [discordx](https://github.com/discordx-ts/discordx), the unique differences are the naming and the `name`/`description` fields, which are now localized.

| discord.ts-template | discordx      |
| ------------------- | ------------- |
| `Command`           | `Slash`       |
| `Option`            | `SlashOption` |
| `Group`             | `SlashGroup`  |

**Example**

```ts
import { ChatInputCommandInteraction } from 'discord.js';
import { Discord } from 'discordx';

import { Command } from '@libraries/localization';

@Discord()
class Moderation {
  // Implicitly the prefix for name and description translation
  // paths will be `MODERATION_BAN_`.
  @Command()
  ban(interaction: ChatInputCommandInteraction) {
    /** ... */
  }

  // Explicitly set the paths for name and description translations.
  @Command({
    name: 'PATH_TO_ANOTHER_NAME',
    description: 'PATH_TO_ANOTHER_DESCRIPTION',
  })
  kick(interaction: ChatInputCommandInteraction) {
    /** ... */
  }
}

export default Moderation;
```

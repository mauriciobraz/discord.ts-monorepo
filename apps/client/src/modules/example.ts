import { ChatInputCommandInteraction } from 'discord.js';
import { Discord } from 'discordx';

import L from '../i18n/i18n-node';
import { Command, getPreferredLocale } from '../utils/discord-i18n';
import { ObjectWithLogger } from '../utils/tslog';

@Discord()
export default class Example {
  @Command()
  async example(interaction: ObjectWithLogger<ChatInputCommandInteraction>) {
    const LL = L[getPreferredLocale(interaction)];

    await interaction.reply({
      content: LL.EXAMPLE_MESSAGE(),
    });
  }
}

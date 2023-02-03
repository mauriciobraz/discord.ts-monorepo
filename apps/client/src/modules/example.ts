import { ChatInputCommandInteraction } from 'discord.js';
import { Discord, Slash } from 'discordx';

import { ObjectWithLogger } from '../utils/tslog';

@Discord()
export default class Example {
  @Slash({
    name: 'example',
    description: 'An example command.',
  })
  async example(interaction: ObjectWithLogger<ChatInputCommandInteraction>) {
    interaction.logger.debug('This is an example of a log message.');

    await interaction.reply({
      content: 'This is an example of a reply.',
    });
  }
}

import { Interaction } from 'discord.js';
import { ArgsOf, Client, Discord, On } from 'discordx';

import { logger, ObjectWithLogger } from '../utils/tslog';

@Discord()
export default class Controller {
  @On({ event: 'ready' })
  async onReady(_: ArgsOf<'ready'>, client: Client) {
    await client.initApplicationCommands();

    logger.info(
      'Successfully initialized application commands and started listening for events.'
    );
  }

  @On({ event: 'interactionCreate' })
  async onInteractionCreate(
    [interaction]: [ObjectWithLogger<Interaction>],
    client: Client
  ) {
    interaction.logger = logger.getSubLogger({
      prefix: [
        interaction.id,
        interaction.user.id,
        interaction.guild?.id ?? 'DM',
      ],
    });

    try {
      interaction.logger.info('Received interaction.');
      await client.executeInteraction(interaction);
      interaction.logger.info('Successfully executed interaction.');
    } catch (error) {
      interaction.logger.error(error);
    }
  }

  // Uncomment this if you want to use message commands (not recommended).
  //
  // @On({ event: "messageCreate" })
  // async onMessageCreate([message]: ArgsOf<"messageCreate">, client: Client) {
  //   await client.executeCommand(message);
  // }
}

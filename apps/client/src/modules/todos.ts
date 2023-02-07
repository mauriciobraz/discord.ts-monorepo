import { randomBytes } from 'crypto';

import { Prisma, PrismaClient } from '@discord.ts-monorepo/database';
import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
} from 'discord.js';
import { Discord } from 'discordx';
import { Service } from 'typedi';

import L from '../i18n/i18n-node';
import { TranslationFunctions } from '../i18n/i18n-types';
import {
  Command,
  getPreferredLocale,
  Group,
  Option,
} from '../utils/discord-i18n';
import { ObjectWithLogger } from '../utils/tslog';

type LoggableChatInputCommandInteraction =
  ObjectWithLogger<ChatInputCommandInteraction>;

interface HandleTodoCompleteStateChangeOptions {
  interaction: ChatInputCommandInteraction;

  slug: string;
  completed: boolean;
}

interface HandlePrismaErrorOptions {
  interaction: ChatInputCommandInteraction;
  error: Prisma.PrismaClientKnownRequestError;
  LL: TranslationFunctions;
}

@Group({ assignMethods: true })
@Discord()
@Service()
export class Todos {
  constructor(private readonly prisma: PrismaClient) {}

  @Command()
  async listTodos(interaction: LoggableChatInputCommandInteraction) {
    const LL = L[getPreferredLocale(interaction)];

    const todos = await this.prisma.todo.findMany({
      where: {
        userId: interaction.user.id,
      },
      select: {
        slug: true,
        title: true,
        completed: true,
      },
    });

    if (todos.length === 0) {
      await interaction.reply({
        ephemeral: true,
        content: LL.TODOS_LIST_TODOS_NO_TODOS(),
      });

      return;
    }

    const todosText = todos
      .map(
        (todo) =>
          `${todo.completed ? '✅' : '❌'} ${todo.title} *(${todo.slug})*`
      )
      .join('\n');

    await interaction.reply({
      ephemeral: true,
      content: LL.TODOS_LIST_TODOS({
        todos: todosText,
        todosCount: todos.length,
      }),
    });
  }

  @Command()
  async addTodo(
    @Option({
      name: 'TODOS_ADD_TODO_OPTION_TITLE_NAME',
      description: 'TODOS_ADD_TODO_OPTION_TITLE_DESCRIPTION',
      type: ApplicationCommandOptionType.String,
      required: true,
    })
    title: string,
    interaction: LoggableChatInputCommandInteraction
  ) {
    const LL = L[getPreferredLocale(interaction)];

    const todo = await this.prisma.todo.create({
      data: {
        User: {
          connectOrCreate: {
            create: { id: interaction.user.id },
            where: { id: interaction.user.id },
          },
        },
        slug: this.#createSlug(title),
        title,
      },
    });

    await interaction.reply({
      ephemeral: true,
      content: LL.TODOS_ADD_TODO_SUCCESS({
        slug: todo.slug,
      }),
    });
  }

  @Command()
  async removeTodo(
    @Option({
      name: 'TODOS_OPTION_SLUG_NAME',
      description: 'TODOS_OPTION_SLUG_DESCRIPTION',
      type: ApplicationCommandOptionType.String,
      required: true,
    })
    slug: string,
    interaction: LoggableChatInputCommandInteraction
  ) {
    const LL = L[getPreferredLocale(interaction)];

    try {
      await this.prisma.todo.delete({
        where: { slug },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        await this.#handlePrismaError({ LL, error, interaction });
      }

      return;
    }

    await interaction.reply({
      ephemeral: true,
      content: LL.TODOS_REMOVE_TODO_SUCCESS(),
    });
  }

  @Command()
  async completeTodo(
    @Option({
      name: 'TODOS_OPTION_SLUG_NAME',
      description: 'TODOS_OPTION_SLUG_DESCRIPTION',
      type: ApplicationCommandOptionType.String,
      required: true,
    })
    slug: string,
    interaction: LoggableChatInputCommandInteraction
  ) {
    await this.#handleTodoCompletionStateChange({
      completed: true,
      interaction,
      slug,
    });
  }

  @Command()
  async uncompleteTodo(
    @Option({
      name: 'TODOS_OPTION_SLUG_NAME',
      description: 'TODOS_OPTION_SLUG_DESCRIPTION',
      type: ApplicationCommandOptionType.String,
      required: true,
    })
    slug: string,
    interaction: LoggableChatInputCommandInteraction
  ) {
    await this.#handleTodoCompletionStateChange({
      completed: false,
      interaction,
      slug,
    });
  }

  async #handleTodoCompletionStateChange({
    completed,
    interaction,
    slug,
  }: HandleTodoCompleteStateChangeOptions) {
    const LL = L[getPreferredLocale(interaction)];

    try {
      await this.prisma.todo.update({
        where: { slug },
        data: { completed },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        await this.#handlePrismaError({ LL, error, interaction });
      }

      return;
    }

    await interaction.reply({
      ephemeral: true,
      content: completed
        ? LL.TODOS_COMPLETE_TODO_SUCCESS()
        : LL.TODOS_UNCOMPLETE_TODO_SUCCESS(),
    });
  }

  async #handlePrismaError({
    LL,
    error,
    interaction,
  }: HandlePrismaErrorOptions) {
    switch (error.code) {
      // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
      case 'P2025':
        await interaction.reply({
          ephemeral: true,
          content: LL.TODOS_TODO_NOT_FOUND(),
        });

        break;

      default:
        throw error;
    }
  }

  #createSlug(title: string) {
    return `${title
      .trim()
      .slice(0, 32)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')}-${randomBytes(4).toString('hex')}`;
  }
}

import type { BaseTranslation } from '../i18n-types';

export default {
  HI: 'Hi {name:string}! Please leave a star if you like this project: https://github.com/mauriciobraz/discord.ts-monorepo',
  EXAMPLE_MESSAGE: 'This is an example of a message with I18n support.',

  TODOS_LIST_TODOS:
    'Currently you have {todosCount:number} todos in your list.\n\n{todos:string}',

  TODOS_LIST_TODOS_NO_TODOS:
    'You have no todos yet. Use `/todos add` to add one.',

  TODOS_ADD_TODO_SUCCESS: 'Todo added successfully with slug `{slug:string}`.',

  TODOS_REMOVE_TODO_SUCCESS: 'Todo removed successfully.',

  TODOS_TODO_NOT_FOUND: 'Todo not found.',

  TODOS_COMPLETE_TODO_SUCCESS: 'Todo set as completed successfully.',

  TODOS_UNCOMPLETE_TODO_SUCCESS: 'Todo set as uncompleted successfully.',
} satisfies BaseTranslation;

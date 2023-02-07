import { mergeTranslations } from '../helpers';

export default mergeTranslations('*', {
  HI: 'Olá {name}! Por favor, deixe uma estrela se você gostar do projeto: https://github.com/mauriciobraz/discord.ts-monorepo',
  EXAMPLE_MESSAGE: 'Este é um exemplo de uma mensagem com suporte I18n.',

  TODOS_LIST_TODOS:
    'Atualmente você tem {todosCount} tarefas em sua lista.\n\n{todos}',

  TODOS_LIST_TODOS_NO_TODOS:
    'Você ainda não tem tarefas. Use `/tarefas adicionar` para adicionar uma.',

  TODOS_ADD_TODO_SUCCESS: 'Tarefa adicionada com sucesso com slug `{slug}`.',

  TODOS_REMOVE_TODO_SUCCESS: 'Tarefa removida com sucesso.',

  TODOS_TODO_NOT_FOUND: 'Tarefa não encontrada.',

  TODOS_COMPLETE_TODO_SUCCESS: 'Tarefa marcada como completa com sucesso.',

  TODOS_UNCOMPLETE_TODO_SUCCESS:
    'Tarefa marcada como não completa com sucesso.',
});

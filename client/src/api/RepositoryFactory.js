import TodosRepository from './repositories/todosRepository';

const repositories = {
    todos: TodosRepository,
}

export const RepositoryFactory = {
    get: name => repositories[name],
}

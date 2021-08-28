const TodosController = require("../controllers/todos.controller");
const { createTodoRequest } = require('../requests/create-todo.request');
const { updateTodoRequest } = require('../requests/update-todo.request');

// there is a possibility to add middlewares as well, by passing "middlewares" property which should be an array

const routes = [
    {
        path: '/todos',
        method: 'post',
        action: TodosController.create,
        request: [createTodoRequest],
    },
    {
        path: '/todos',
        method: 'get',
        action: TodosController.findAll,
    },
    {
        path: '/todos/:todoId',
        method: 'get',
        action: TodosController.findOne,
    },
    {
        path: '/todos/:todoId',
        method: 'put',
        action: TodosController.update,
        request: [updateTodoRequest]
    },
    {
        path: '/todos/:todoId',
        method: 'delete',
        action: TodosController.delete,
    },
    {
        path: '/todos',
        method: 'delete',
        action: TodosController.deleteAll,
    },
    {
        path: '/mergeable-todos',
        method: 'get',
        action: TodosController.getAllMergeableTodos,
    },
    {
        path: '/merge/:todoId',
        method: 'put',
        action: TodosController.merge,
    }
];

module.exports = routes;
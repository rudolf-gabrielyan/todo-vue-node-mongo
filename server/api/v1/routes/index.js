const express = require('express');
const route = express.Router();
const todosRoutes = require('./todos.routes');

const routes = [
    ...todosRoutes
];

for (const eachRoute of routes) {
    route[eachRoute.method](`${eachRoute.path}`,
        ...(eachRoute.request ? eachRoute.request : []),
        ...(eachRoute.middlewares ? eachRoute.middlewares : []),
        eachRoute.action
    );
}

module.exports = route;
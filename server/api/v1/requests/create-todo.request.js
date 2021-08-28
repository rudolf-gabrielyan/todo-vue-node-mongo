const { check } = require('express-validator');

const createTodoRequest = [
    check('title')
        .notEmpty()
        .withMessage('Title field is required')
        .isLength({ min: 6 })
        .withMessage('Title min length 6 symbol.'),
];

module.exports = { createTodoRequest };
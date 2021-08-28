const Todo = require('../models/todos.model');
const { validationResult } = require('express-validator');

// Create and Save a new Todo
exports.create = (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create a Todo
    const todo = new Todo({
        title: req.body.title || "Untitled Todo", 
        status: 'todo'
    });

    // Save Todo in the database
    todo.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Todo."
            });
        });
};

// Retrieve and return all todos from the database.
exports.findAll = (req, res) => {
    const filter = req.query.status ? { status: req.query.status } : {};
    
    Todo.find(filter)
        .then(todos => {
            res.send(todos);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving todos."
            });
        });
};

// Find a single todo with a todoId
exports.findOne = (req, res) => {
    Todo.findById(req.params.todoId)
        .then(todo => {
            if(!todo) {
                return res.status(404).send({
                    message: `Todo not found with id ${req.params.todoId}`  
                });            
            }
            res.send(todo);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `Todo not found with id ${req.params.todoId}`  
                });                
            }
            return res.status(500).send({
                message: `Error retrieving todo with id ${req.params.todoId}`
            });
        });
};

// Update a todo identified by the todoId in the request
exports.update = (req, res) => {
    // Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find todo and update it with the request body
    Todo.findByIdAndUpdate(req.params.todoId, {
        title: req.body.title || "Untitled Todo",
        status: req.body.status || "todo"
    }, {new: true})
    .then(todo => {
        if(!todo) {
            return res.status(404).send({
                message: `Todo not found with id ${req.params.todoId}` 
            });
        }
        res.send(todo);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Todo not found with id ${req.params.todoId}`
            });                
        }
        return res.status(500).send({
            message: `Error updating todo with id ${req.params.todoId}`
        });
    });
};

// Delete a todo with the specified todoId in the request
exports.delete = (req, res) => {
    Todo.findByIdAndRemove(req.params.todoId)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: `Todo not found with id ${req.params.todoId}`
                });
            }
            res.send({message: "Todo deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: `Todo not found with id ${req.params.todoId}`
                });                
            }
            return res.status(500).send({
                message: `Could not delete todo with id ${req.params.todoId}`
            });
        });
};

//Delete all todos
exports.deleteAll = (req, res) => {
    Todo.deleteMany({}, (err) => {
        if(err) {
            return res.status(500).send({
                message: "Could not delete todos"
            })
        } else {
            res.send({message: "Todos deleted successfully!"});
        }
    })
}

// Retrieve and return all mergeable todos from the database.
exports.getAllMergeableTodos = (req, res) => {
    Todo.find({_id: { $ne: req.query.except } })
        .then(todos => {
            res.send(todos);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving todos."
            });
        });
}

//Merge Todos
exports.merge = async (req, res) => {
    try {
        const mainTodo = await Todo.findById(req.params.todoId);
        const mergeWithTodo = await Todo.findById(req.body.mergeWith);

        await Todo.findByIdAndUpdate(req.params.todoId, {
            title: `${mainTodo.title}, ${mergeWithTodo.title}` || "Untitled Todo",
        }, {new: true});

        await Todo.findByIdAndRemove(req.body.mergeWith);

        res.send({message: "Merged successfully!"});
    } catch (error) {
        return res.status(500).send({
            message: 'Could not merge todos, please try again'
        });
    }
}
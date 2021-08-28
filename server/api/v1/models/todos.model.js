const mongoose = require('mongoose');

const TodosSchema = mongoose.Schema({
    title: String,
    status: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Todos', TodosSchema);
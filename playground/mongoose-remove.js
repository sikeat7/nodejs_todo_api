const {ObjectID} = require('mongoose');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


var id = '5ad770a8cf01cc6be4db483a';
// Delete
// Todo.findOneAndRemove
// Todo.findByIdAndRemove
Todo.findOneAndRemove(id).then((todo) => {
	console.log(todo);
});
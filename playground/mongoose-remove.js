const {ObjectID} = require('mongoose');

const {mongoose} = require('./../server/db/mongoose');
const {TodoSchema} = require('./../server/models/todo');
const {UserSchema} = require('./../server/models/user');


var id = '5ad770a8cf01cc6be4db483a';
// Delete
// TodoSchema.findOneAndRemove
// TodoSchema.findByIdAndRemove
TodoSchema.findOneAndRemove(id).then((todo) => {
	console.log(todo);
});
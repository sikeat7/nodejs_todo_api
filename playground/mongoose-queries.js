const {ObjectID} = require('mongoose');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

console.log(JSON.stringify(User));

var todo_id = '5ad77057cf01cc6be4db4839';

Todo.find({
	_id: todo_id
}).then((todos) => {
	console.log('Todos', todos);
});

Todo.findOne({
	_id: todo_id
}).then((todo) => {
	console.log('Todo', todo);
});

Todo.findById(todo_id).then((todo)=>{
	if(!todo){
		return console.log('ID not found!');
	}
	console.log('Find By ID', todo);
}).catch((e) => console.log(e) );

// User by ID

User.findOne({
	_id: '5ad60647819ea46b84bc1d0e'
}).then((user) => {
	console.log('User', user);
});

User.findById('5ad606099ec21aa57826d0aa').then((user) =>{
	if(!user){
		return console.log('User not found!');
	}
	console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
	console.log(e);
});
// const express = require('express');
// const mongodb = require('mongodb');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// var TodoSchema = mongoose.model('Todo', {
// 	text:{
// 		type: String,
// 		required: true,
// 		minlength: 1,
// 		trim: true
// 	},
// 	completed:{
// 		type: Boolean,
// 		default: false,
// 	},
// 	completedAt:{
// 		type: Number,
// 		default: null
// 	}
// });

// var newTodo = new TodoSchema({
// 	text: 'Something To do',
// 	completed: true,
// 	completedAt: 12
// });

// newTodo.save().then((doc) => {
// 	console.log('Saved todo', doc);
// }, (e) => {
// 	console.log('Unable to save Todo');
// });

var AddressBookSchema = mongoose.model('AddressBook', {
	name:{
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	phone:{
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	email:{
		type: String,
		required: true,
		minlength: 1,
		trim: true
	}
});

var addressBook = new AddressBookSchema({
	name: 'Sikeat',
	phone: '+xxx xxx xxx',
	email: 'demo@gmail.com'
});

addressBook.save().then((doc) =>{
	console.log('Address Book saved', doc);
}, (e) => {
	console.log('Unable to save Address Book');
});
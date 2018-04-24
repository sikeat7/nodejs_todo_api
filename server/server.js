const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {TodoSchema} = require('./models/todo');
var {AddressBookSchema} = require('./models/addressbook');

var app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());

app.post('/todos', (req, res) =>{
	var todo = new TodoSchema({
		text: req.body.text
	});

	todo.save().then((doc) =>{
		res.send(doc)
	}, (err) =>{
		res.status(400).send(err);
	});
});

app.get('/todos', (req, res) => {
	TodoSchema.find().then((todos) =>{
		res.send({todos});
	}, (e) =>{
		res.status(400).send(e);
	});
});

// Individual Request with Paramerter
app.get('/todos/:id', (req, res) => {
	var id = req.params.id;
	
	// Valid id with isValid
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	TodoSchema.findById(id).then((todo) => {
		
		TodoSchema.findByIdAndRemove(id).then((todo) => {
			if(!todo){
				return res.status(404).send();
			}
			res.send(todo);
		}, (e) => {
			return res.status(404).send();
		});

		res.send({todo});
	}).catch((e) => {
		return res.status(404).send();
	});
});

// Delete Request
app.delete('/todos/:id', (req, res) => {
 var id = req.params.id;

 // valid the id -> not valid? return 404
 if(!ObjectID.isValid(id)){
 	return res.status(404).send();
 }

 TodoSchema.findByIdAndRemove(id).then((todo) => {
 	if(!todo){
 		return res.status(404).send();
 	}
	
	 TodoSchema.findByIdAndUpdate(id).then((todo) => {
		if(!todo){
			return res.status(404).send();
		}
		
		res.send({todo})
	 }, (e) => {
		return res.status(404).send();
	 });

	res.send(todo);
 }).catch((e) => {
 	return res.status(400).send();
 });

});


// Update Request
app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	 // valid the id -> not valid? return 404
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	}else{
		body.completed = false;
		body.completedAt = null;
	}

	TodoSchema.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if(!todo){
			return res.status(404).send();
		}

		res.send({todo});
	}).catch((e) => {
		return res.status(400).send(e);
	});

});


// Post /users
app.post('/users', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);

	user.save().then((user) => {	
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e)
	});
});






// Starting the Server
app.listen(port, () => {
	console.log('Server started on port', port);
})

module.exports = {app};
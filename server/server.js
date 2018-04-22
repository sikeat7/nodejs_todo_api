var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {UserSchema} = require('./models/user');
var {TodoSchema} = require('./models/todo');
var {AddressBookSchema} = require('./models/addressbook');

var app = express();

// Middleware
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
		if(!todo){
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => {
		return res.status(404).send();
	});
});



// Starting the Server
app.listen(3000, () => {
	console.log('Server started on port 3000');
})
var express = require('express');
var bodyParser = require('body-parser');

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

app.listen(3000, () => {
	console.log('Server started on port 3000');
})
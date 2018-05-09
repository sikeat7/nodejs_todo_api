require('./config/config');

const express = require('express');
const morgan = require('morgan');
const _ = require('lodash');
const bodyParser = require('body-parser');
const {
	ObjectID
} = require('mongodb');

var {
	mongoose
} = require('./db/mongoose');
var {
	User
} = require('./models/user');
var {
	Todo
} = require('./models/todo');
var {
	AddressBookSchema
} = require('./models/addressbook');

var {
	authenticate
} = require('./middleware/authenticate');

var app = express();

// Middlewares
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.post('/todos', authenticate, async (req, res) => {
	const todo = new Todo({
		text: req.body.text,
		_creator: req.user._id
	});

	try {
		const doc = await todo.save();
		res.send(doc);
	} catch (e) {
		res.status(400).send(e);
	}
});

app.get('/todos', authenticate, async (req, res) => {
	try {
		const todos = await Todo.find({
			_creator: req.user._id
		});
		res.send({
			todos
		});
	} catch (e) {
		res.status(400).send(e);
	}
});

// Individual Request with Paramerter
app.get('/todos/:id', authenticate, async (req, res) => {
	const id = req.params.id;
	// Valid id with isValid
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	try {
		const todo = await Todo.findOne({
			_id:id,
			_creator: req.user._id
		});
		if (!todo) {
			return res.status(404).send();
		}
		res.send(todo);
	} catch (e) {
		return res.status(404).send();
	}
});

// Delete Request
// TODO - Convert to async/await
app.delete('/todos/:id', authenticate, async (req, res) => {
	const id = req.params.id;

	// valid the id -> not valid? return 404
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	try {
		const todo = await Todo.findOneAndRemove({
			_id: id,
			_creator: req.user._id
		});
		if (!todo) {
			return res.status(404).send();
		}
		res.send(todo);
	} catch (e) {
		return res.status(400).send();
	}
});

// Update Request
app.patch('/todos/:id', authenticate, async (req, res) => {
	const id = req.params.id;
	const body = _.pick(req.body, ['text', 'completed']);
	// valid the id -> not valid? return 404
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}
	
	try {
		const todo = await Todo.findOneAndUpdate({
			_id: id,
			_creator: req.user._id
		}, {
			$set: body
		}, {
			new: true
		});
		if (!todo) {
			return res.status(404).send();
		}
		res.send({
			todo
		});
	} catch (e) {
		return res.status(400).send(e);
	}
});

// Post /users
app.post('/users', async (req, res) => {
	try {
		const body = _.pick(req.body, ['email', 'password']);
		const user = new User(body);
		await user.save();
		const token = await user.generateAuthToken();
		res.header('x-auth', token).send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

// Post User Login (email, password)
app.post('/users/login', async (req, res) => {
	try {
		var body = _.pick(req.body, ['email', 'password']);
		const user = await User.findByCredentials(body.email, body.password);
		const token = await user.generateAuthToken();
		res.header('x-auth', token).send(user);
		res.send(user);	
	} catch (e) {
		res.status(400).send();
	}
});

// Logging Out - Delete /users/me/token
app.delete('/users/me/token', authenticate, async (req, res) => {
	try {
		await req.user.removeToken(req.token);
		res.status(200).send();
	} catch (e) {
		res.status(400).send();
	}
});

// Starting the Server
app.listen(process.env.PORT, () => {
	console.log('Server started on port', process.env.PORT);
})

module.exports = {
	app
};
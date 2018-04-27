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

app.post('/todos', authenticate, (req, res) => {
	var todo = new Todo({
		text: req.body.text,
		_creator: req.user._id
	});

	todo.save().then((doc) => {
		res.send(doc)
	}, (err) => {
		res.status(400).send(err);
	});
});

app.get('/todos', authenticate, (req, res) => {
	Todo.find({
		_creator: req.user._id
	}).then((todos) => {
		res.send({
			todos
		});
	}, (e) => {
		res.status(400).send(e);
	});
});

// Individual Request with Paramerter
app.get('/todos/:id', authenticate, (req, res) => {
	var id = req.params.id;

	// Valid id with isValid
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findOne({
		_id:id,
		_creator: req.user._id
	}).then((todo) => {

		Todo.findByIdAndRemove(id).then((todo) => {
			if (!todo) {
				return res.status(404).send();
			}
			res.send(todo);
		}, (e) => {
			return res.status(404).send();
		});

		res.send({
			todo
		});
	}).catch((e) => {
		return res.status(404).send();
	});
});

// Delete Request
app.delete('/todos/:id', authenticate, (req, res) => {
	var id = req.params.id;

	// valid the id -> not valid? return 404
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findOneAndRemove({
		_id: id,
		_creator: req.user._id
	}).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}

		Todo.findByIdAndUpdate(id).then((todo) => {
			if (!todo) {
				return res.status(404).send();
			}

			res.send({
				todo
			})
		}, (e) => {
			return res.status(404).send();
		});

		res.send(todo);
	}).catch((e) => {
		return res.status(400).send();
	});

});

// Update Request
app.patch('/todos/:id', authenticate, (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

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

	Todo.findOneAndUpdate({
		_id: id,
		_creator: req.user._id
	}, {
		$set: body
	}, {
		new: true
	}).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}

		res.send({
			todo
		});
	}).catch((e) => {
		return res.status(400).send(e);
	});

});


// Post /users
app.post('/users', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);

	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	});
});

app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

// Post User Login (email, password)
app.post('/users/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);

	User.findByCredentials(body.email, body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user);
		});
		res.send(user);
	}).catch((e) => {
		res.status(400).send();
	});
});

// Logging Out - Delete /users/me/token
app.delete('/users/me/token', authenticate, (req, res) => {
	req.user.removeToken(req.token).then(() => {
		res.status(200).send();
	}, () => {
		res.status(400).send();
	});
});

// Starting the Server
app.listen(process.env.PORT, () => {
	console.log('Server started on port', process.env.PORT);
})

module.exports = {
	app
};
var mongoose = require('mongoose');

var UserSchema = mongoose.model('Users', {
	name:{
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	age:{
		type: Number,
		default: 0,
	},
	location:{
		type: String,
		default: null
	}
});

module.exports = {UserSchema}
const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
	email:{
		type: String,
		required: true,
		trim: true,
		minlength:1,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			default: null
		},
		token: {
			type: String,
			default: null
		}
	}]
});

UserSchema.methods.toJSON = function(){
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function(){
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc@123').toString();

	user.tokes.push({access, token});
	return user.save().then(() => {
		return token;
	});
};

UserSchema.statics.findByToken = function(token){
	var user = this;
	var decoded;

	try {
		decoded = jwt.verify(token, 'abc@123');
	} catch (e) {
		
	}

	return user.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
}

var User = mongoose.model('Users', UserSchema);

module.exports = {User}
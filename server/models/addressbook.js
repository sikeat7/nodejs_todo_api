var mongoose = require('mongoose');

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

module.exports = {AddressBookSchema}
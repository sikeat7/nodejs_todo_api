// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

const config = require('./config/config');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect(config.database, (err, client) => {
	if(err){
		return console.log('Unable to connect to Mongo Database!');
	}
	console.log('Connected to Mongo Server');

	const db = client.db(config.databaseName);

	/* 
	* Insert Data
	*/
	// db.collection('Users').insertOne({
	// 	name: 'Sovath',
	// 	age: 21,
	// 	location: 'Phnom Penh'
	// }).then((result) => {
	// 	console.log(result);
	// });

	/* 
	* Fetch All Data with Array 
	*/
	// db.collection('Users').find().toArray().then((docs) => {
	// 	console.log('Users');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to fecth users', err);
	// });

	/* 
	* Fetch All Data with Array With Condition
	*/
	// db.collection('Users').find({ name: 'David') }).toArray().then((docs) => {
	// 	console.log('Users');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to fecth users', err);
	// });

	/* 
	* Get Count all data
	*/
	// db.collection('Users').find().count().then((count) => {
	// 	console.log(`Total User: ${count}`);
	// }, (err) => {
	// 	console.log('Unable to fecth users', err);
	// });


	/*
	* DeleteMany
	*/
	// db.collection('Users').deleteMany({ name: 'David' }).then((result) => {
	// 	console.log(result);
	// });

	/*
	* DeleteOne
	*/
	// db.collection('Users').deleteOne({ name: 'David' }).then((result) => {
	// 	console.log(result);
	// });

	/*
	* FindOneAndDelete
	*/
	// db.collection('Users').FindOneAndDelete({ location: 'Phnom Penh' }).then((result) => {
	// 	console.log(result);
	// });

	/*
	* Update User
	*/

	// db.collection('Users').findOneAndUpdate({
	// 	name: 'Johny'
	// },{
	// 	$set: {
	// 		location: 'United State'
	// 	},
	// 	$inc: {
	// 		age: -3
	// 	}
	// }).then((result) => {
	// 	console.log(result);
	// });

	// client.close();
});


// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

const config = require('./config/config');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect(config.database, (err, db) => {
	if(err){
		return console.log('Unable to connect to Mongo Database!');
	}
	console.log('Connected to Mongo Server');

	const dbData = db.db(config.databaseName);

	/* 
	* Fetch All Data with Array 
	*/
	// dbData.collection('Users').find().toArray().then((count) => {
	// 	console.log('Users');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to fecth users', err);
	// });

	/* 
	* Fetch All Data with Array With Conditino
	*/
	// dbData.collection('Users').find({ _id: new ObjectID('5ad60647819ea46b84bc1d0e') }).toArray().then((count) => {
	// 	console.log('Users');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to fecth users', err);
	// });

	/* 
	* Get Count all data
	*/
	dbData.collection('Users').find().count().then((count) => {
		console.log(`Total User: ${count}`);
	}, (err) => {
		console.log('Unable to fecth users', err);
	});

	// db.close();
});


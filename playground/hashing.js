const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hashPassword = '$2a$10$Jg8IG8zt85M1EgTkhPTVY.kzGznjZOz3lmu8SsdSGAqkTqhuVR9qW';

bcrypt.compare(password, hashPassword, (err, res) => {
    console.log(res)
});

// var data = {
//     id: 10
// };

// var token = jwt.sign(data, 'abc@124');
// console.log(token);

// var decoded = jwt.verify(token, 'abc@124');
// console.log('decoded', decoded);




// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// }

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // Client try to change without knowing the scret on server
// // token.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(resultHash === token.hash){
//     console.log('Data was not change');
// }else{
//     console.log('Data was changed. Do not trust!');
// }
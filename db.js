/*
mongoose is being used to connect to mongodb
*/
var mongoose = require('mongoose');
/*
mongodb is running on the default 27017 port for me
*/
var dbUrl = 'localhost:27017/testdb'
var mongodbUri = 'mongodb://'+dbUrl;

var db = mongoose.connect(mongodbUri);

// for when mongoose connection is successful
mongoose.connection.on('connected', function () {  
  console.log('Mongoose connection opened at:' + mongodbUri);
}); 

// for when connection error occurs
mongoose.connection.on('error',function (error) {  
  console.log('Mongoose connection error: ' + error);
}); 

// for when disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose connection disconnected'); 
});


/*
Each Schema maps to a MongoDB collection is core to mongoose. Check more details at
http://mongoosejs.com/docs/guide.html
*/

var Schema = mongoose.Schema;

var usersSchema = new Schema({
        userid: {type:Number,index:{unique:true}},
        username: String,
        password: String,
        role: String
});

var Users = mongoose.model('users',usersSchema);

//module.exports = Users;
exports.Users = Users;

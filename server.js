var express = require('express');
var db = require('./db.js');

var port = 3000;

//var serverApp = express();

var ServerApp = express();

//var http = require('http').Server(app);

var Server = ServerApp.listen(port,function(){
    //console.log('Server Details:',Server.address());
    var servername = Server.address().address;
    console.log('ServerApp started at http://%s:%s',servername,port);
});

//To setup CORS
ServerApp.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


//To read all users from the mongodb users collection and return it
ServerApp.get('/getusers',function(req,res,next){
    db.Users.find({},function(err,docs) {
        if(err){
            return console.error('Error with /getUsers:',err);
        }
        console.log('Data from mongodb:',docs);
        res.send({dbdata:docs});
    })
});


//To read details of a particular user using query parameter
ServerApp.get('/getuser',function(req,res,next){
    var username = req.query.username;
    console.log('Looking up details for user:'+username);
    db.Users.find({"username":username},function(err,docs) {
        if(err){
            return console.error('Error with /getusers:',err);
        }
        console.log('Data from mongodb:',docs);
        res.send({dbdata:docs});
    })
});

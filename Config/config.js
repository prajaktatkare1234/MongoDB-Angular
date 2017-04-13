var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/mydb';
mongoose.connect(mongoDB);
var db = mongoose.connection;

// module.exports=db;

var express=require('express');
var app= express();
// var mongoose = require('mongoose');

var bodyParser=require('body-parser');


var p=process.env.PORT||8081
// app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(valiator());
app.use(require('./Controller'));
var server = app.listen(p, function () {
  var host = server.address().address
  var port = server.address().port
console.log("Example app listening at http://%s:%s", host, port)
})

var express = require('express');
// var app = express();
var router = express.Router();
var User = require('../Model/index.js');
console.log("in controller");
// var db=require('./Config/config.js');

router.post('/', function(req, res) {

    User.save_user(req, function(err, result) {

        if (err) {

            res.send({
                "status": false,
                "message": err
            });
        } else {

            res.send({
                "status": true,
                "message": "Registration Successfull"
            });
        }


    });
});






module.exports = router;

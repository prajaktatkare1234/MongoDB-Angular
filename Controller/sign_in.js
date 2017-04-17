var express = require('express');
var router = express.Router();
var cookie=require('cookie-parser')
var jwt = require('jsonwebtoken');
var config = require('../Config/config.js');
var User = require('../Model/index.js');
console.log("in controller");

router.post('/', function(req, res) {

    User.login(req.body, function(err, result) {

      console.log(result);

        if (err) {

            res.send({
                "status": false,
                "message": "login failed"

            });
        } else {
            if (result) {
                console.log("r", result);
                var token = jwt.sign({
                    _id: result._id
                }, config.secret, {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                });

                res.cookie('cookie',token);
                res.send({
                    "status": true,
                    "message": "logged in Successfully",
                    "token": token
                });
            } else {
                res.send({
                    "status": false,
                    "message": "login failed"

                });

            }
        }


    });
});






module.exports = router;

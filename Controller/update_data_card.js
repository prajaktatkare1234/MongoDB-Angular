var express = require('express');
var router = express.Router();
var User = require('../Model/data_card.js');
// console.log("in controller");

router.post('/', function(req, res) {


    User.update_data(req.body, function(err, result) {

      console.log(result);

        if (err) {

            res.send({
                "status": false,
                "message": "data cant be updated"

            });
        } else {
            if (result) {
                console.log("r", result);



                res.send({
                    "status": true,
                    "message": "data updated Successfully",

                })
            } else {
                res.send({
                    "status": false,
                    "message": "updation failed"

                });

            }
        }


    });

  });





module.exports = router;

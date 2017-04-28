var express = require('express');
var router = express.Router();
var User = require('../Model/data_card.js');
// console.log("in controller");

router.post('/', function(req, res) {


    User.delete_data(req.body, function(err, result) {

      // console.log("controller",result.d_no);
      // console.log(err);
      if(err){
        res.send({
                "status": false,
                "message": err


      })
    }
      else{
        res.send({
                  "status": true,
                  "message": "data deleted Successfully",


      })
    }

        // if (err) {
        //
        //     res.send({
        //         "status": false,
        //         "message": "data cant be deleted"
        //
        //     });
        // } else {
        //     if (result) {
        //         console.log("r", result);
        //
        //
        //
        //         res.send({
        //             "status": true,
        //             "message": "data deleted Successfully",
        //
        //         })
        //     } else {
        //         res.send({
        //             "status": false,
        //             "message": "deletion failed"
        //
        //         });
        //
        //     }
        // }
        //

    });

  });





module.exports = router;

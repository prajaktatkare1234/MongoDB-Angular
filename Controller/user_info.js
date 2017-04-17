var express=require('express');
router=express.Router();
var User = require('../Model/index.js');
router.post('/',function(req,res){

  User.findById(req.decode._id,function(err,user){
    if(user){
        res.send({"user_detail":user});

    }
    else{
      res.send({message:"error"});
    }
  })


});
module.exports=router;

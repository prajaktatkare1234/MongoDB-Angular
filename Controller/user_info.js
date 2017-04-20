var express=require('express');
router=express.Router();
var User = require('../Model/index.js');
router.post('/',function(req,res){

  User.profile(req.decode,function(err,data){
    if(data)
    {
      res.send({"user_data":data})
    }
    else
    {
      res.send({message:"err"})
    }

  })

});
module.exports=router;

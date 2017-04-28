var express=require('express');
router=express.Router();
var User = require('../Model/index.js');
router.post('/',function(req,res){

  User.profile(req.decode,function(err,data){
    if(data)
    {
    console.log("in user_info",data);
      res.send({"user_data":data,"status":true})
    }
    else
    {
      res.send({message:"err","status":false})
    }

  })

});
module.exports=router;

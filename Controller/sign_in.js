var express= require('express');
var app=express();
 var router=express.Router();
 var User= require('../Model/sign_in.js');
console.log("in controller");


 router.post('/',function(req,res){

 User.login(req,function(err,result) {
   console.log(err);

   if(err) {

         res.send({"status":false,"message":err});
     }
     else {
       res.send({"status":true,"message":"logged in Successfully"});
     }


});
});






module.exports=router;

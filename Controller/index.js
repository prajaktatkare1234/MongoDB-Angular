var express= require('express');
 var router=express.Router();




router.use('/sign_up',require('./sign_up'));
router.use('/sign_in',require('./sign_in'));


module.exports=router;

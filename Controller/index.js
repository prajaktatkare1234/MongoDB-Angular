var express = require('express');
var router = express.Router();

router.use('/sign_up', require('./sign_up'));
router.use('/sign_in', require('./sign_in'));
router.use('/user_info', require('./authenticate'), require('./user_info'));
router.use('/logout', require('./logout'));




module.exports = router;

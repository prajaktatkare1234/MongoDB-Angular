var mongoose = require('mongoose');
validators = require('mongoose-validators');
console.log("in model");
var Schema = mongoose.Schema;

require('../Config/config.js');
var User = require('../Model/sign_up.js');

//  var userloginSchema =Schema({
//
//   email: {type: String,required:true},
//   password:{type:String,required:true}
// });
//

User.login = function(req, cb) {


    User.findOne({
        $and: [{
            email: req.body.email
        }, {
            password: req.body.password
        }]
    }, function(err, User) {
        if (User) {
            console.log(User);
            cb(null, "valid User");
        } else {
            console.log("err");
            cb("Invalid User", null);
        }

    });
    // var User = mongoose.model('User', userloginSchema);
}



module.exports = User;

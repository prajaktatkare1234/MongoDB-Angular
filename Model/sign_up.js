var mongoose = require('mongoose');
validators = require('mongoose-validators');
var unique_val = require('mongoose-unique-validator');
console.log("in model");
var Schema = mongoose.Schema;

require('../Config/config.js');

var userSchema = Schema({
    // _id:{type:Number,required:true},
    name: {
        type: String,
        required: true,
        validate: validators.isAlpha(),
        minlength: 3,
        maxlength: 8
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: validators.isEmail()
    },
    password: {
        type: String,
        required: true,
        validate: validators.isAlpha(),
        minlength: 5,
        maxlength: 8
    }
});
userSchema.plugin(unique_val);

userSchema.statics.save_user = function(req, cb) {

    var user_Detail = new User({
        //  _id:req.body._id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    // User.findOne({ email : req.body.email }, function (err, User) {
    //   if (User){
    //     console.log(User);
    //     cb(null,"valid User");
    //  }
    //   else {
    //     console.log("err");
    //      cb("Invalid User",null);
    //   }
    //
    // });
    user_Detail.save(function(err) {
        if (err)
            cb(err, null);
        else
            cb(null, "Saved");
    });

};
var User = mongoose.model('User', userSchema);




module.exports = User;
// validate: validators.isEmail()

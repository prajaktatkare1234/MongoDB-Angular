var mongoose = require('mongoose');
// validators = require('mongoose-validators');
var express = require('express');

var Schema = mongoose.Schema;

var data_card_Schema = Schema({
    d_no: {
        type: String
    },

    title: {
        type: String

    },
    take_note:{
      type:String
    }


});
var data_card_detail;
data_card_Schema.statics.save_data = function(req,d_no, cb) {
  console.log("in save function cxvgfdg");
    console.log(req);
    console.log(d_no);
    console.log("completed");
    data_card_detail = new this({
        d_no:d_no._id,
        title:req.title,
        take_note:req.take_note

    });

    data_card_detail.save(cb);
};
data_card_Schema.statics.update_data = function(req, cb) {
    console.log(req);
    this.update({
        d_no: req.d_no
    }, {
        $set: {
            data: req.data
        }
    }, cb);
};
data_card_Schema.statics.delete_data = function(req, cb) {
    console.log(req);
    this.findOne({
        d_no: req.d_no
    }, function(err,data){
      if(data){
        this.remove({d_no:req.d_no}
        ,function(err){
          if(err){
            cb("err","data not deleted");
            return;
          }
          cb(null,"data deleted")
        });

      }
      else{
            cb("err","data not deleted");
      }

    });
};
data_card_Schema.statics.get_data = function(req, cb) {
    console.log(req._id,"in get function");
    this.find({d_no:req._id},cb);
};


var data_card = mongoose.model('data_card', data_card_Schema);

module.exports = data_card;

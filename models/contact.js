var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var contactSchema = new Schema({
  email:{type: String, required: true},
  subject:{type: String, required: true},
  message:{type: String, required: true}

});

module.exports = mongoose.model('Contact', contactSchema);

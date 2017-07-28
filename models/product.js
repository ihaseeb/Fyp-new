var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

  name: {type: String, required: true},
  sale_price: {type: String, required: true},
  original_price: {type: String, required: true},
  sale: {type: String, required: true},
  image:{type: String, required: true}
});

module.exports = mongoose.model('Product', schema);

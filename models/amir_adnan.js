var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var kappasSchema = new Schema({

	name: {type: String, required: true},
	sale_price: {type: String, required: true},
  original_price: {type: String, required: true},
  sale: {type: String},
  image: {type: String, required: true},
  link:{type: String, required: true}
});

module.exports = mongoose.model('Amir_adnan', kappasSchema);

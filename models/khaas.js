var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var kappasSchema = new Schema({

	name: {type: String, required: true},
	sale_price: {type: String, required: true},
  original_price: {type: String, required: true},
  sale: {type: String, required: true},
  image: {type: String, required: true},
  link:{type: String, required: true},
	category:{type: String}
});

module.exports = mongoose.model('Khaas', kappasSchema);

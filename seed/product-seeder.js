var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/kappas');

var products =[
  new Product({
  name: 'kutra',
  sale_price: '1780 Rs',
  original_price: '2500 RS',
  sale: '25%',
  image: 'images/khaadi/khaadi1.jpg',

}),

  new Product({
  name: 'Kameez',
  sale_price: '1580 Rs',
  original_price: '2200 RS',
  sale: '30%',
  image: 'images/khaadi/khaadi2.jpg',

}),


  new Product({
  name: 'Kameez Shalwar',
  sale_price: '3200 Rs',
  original_price: '3500 RS',
  sale: '10%',
  image: 'images/khaadi/khaadi3.jpg',

}),

  new Product({
  name: 'Embroided kutra',
  sale_price: '1800 Rs',
  original_price: '2500 RS',
  sale: '30%',
  image: 'images/khaadi/khaadi4.jpg',

}),

  new Product({
  name: 'Plain Kutra',
  sale_price: '1280 Rs',
  original_price: '1500 RS',
  sale: '8%',
  image: 'images/khaadi/khaadi5.jpg',

}),
];
var done = 0;
for(var i = 0; i < products.length; i++) {
  products[i].save(function(err, result){
    done++;
    if(done === products.length){
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect();
}

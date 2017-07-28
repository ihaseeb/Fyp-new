var Xray = require('x-ray');
var request = require('request');
var fs = require('fs');
var i = 0;
var x = new Xray();
var khaadi = [];
var amira= [];
var mongoose = require('mongoose');

var Khaadi = require('../models/khaadi');
var amir_adnan = require('../models/amir_adnan');





//mongo connection
mongoose.connect('mongodb://localhost/kappas', {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('connect', () => {
	console.log('mongodb connected');
});

db.on('error', e => console.log('error', e));


//mongoose schema defined here


////////////////////////// Khaadi starts here....///////////////////////////////
//
// // mongoose model for khaadi defined here
// var khaadi = mongoose.model('khaadi', kappasSchema);
//
//xray scrapping for khaadi starts here
x('https://www.khaadionline.com/pk/sale.html?limit=60', '.products_grid .product-grid',[{

  name:'.product-name a',
  sale_price:'.special-price .price',
  original_price:'.old-price .price',
  sale:'.imgContainer .badge',
  image:('.imgContainer .test img@src'),
  link: ('.imgContainer a@href')

}])(function(error, khd){

if ( !error ) {

for(var i=0; i< khd.length; i++){

  var khaadidb = new Khaadi({

    name: khd[i].name,
  	sale_price: khd[i].sale_price,
    original_price: khd[i].original_price,
    sale: khd[i].sale,
    image: khd[i].image,
    link: khd[i].link
  });

  khaadidb.save((err, doc) => {
  	if (err) { console.log('err', err)}
  		else {
      }
});

}  //for loop end here
console.log('khaadi data saved to databse');


//drop database - following code is added to avoid duplicate data from scrapping
db.collection("khaadis").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("khaadi duplicate data deleted");
  });//drop database ends here

}//if(!error) ends here

else{
  console.log('Error found : ', error);
}
  }); // x inner ends
//
//
// ///////////////////////// Amir adnan starts here.../////////////////////////////
//
//
// //mongoose model for amir-adnan defind here
// var amir_adnan = mongoose.model('amir_adnan', kappasSchema);
//
x('http://www.amiradnan.com/shalwar-kameez-kurta-sale', '.products .col-md-3',[{
  name:'.product-name h4 a',
  sale_price:'.product-price .new_price',
  original_price:'.product-price .old_price',
  sale:'.product-img .percent',
  image:('.product-img img@src'),
  link:('.product-img a@href')
}])(function(error, result){
  if ( !error ) {

  for(var i=0; i< result.length; i++){

    var amir_adnandb = new amir_adnan({

      name: result[i].name,
    	sale_price: result[i].sale_price,
      original_price: result[i].original_price,
      sale: result[i].sale,
      image: result[i].image,
      link: result[i].link
    });

    amir_adnandb.save((err, doc) => {
    	if (err) { console.log('err', err)}
    		else {
        }
  });
  var j=i+1;
  if(j==result.length){
    console.log('i:'+ i + ' and result: '+ result.length );

  }

  }  //for loop end here
  console.log('Amir adnan data saved to database');

  //drop database - following code is added to avoid duplicate data from scrapping
  // if(db.collection('amir_adnans').find()=true){
  db.collection("amir_adnans").drop(function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log("amir adnan duplicate data deleted");
    });//drop database ends here
  // }
  // else{
  //   console.log("no database exit atm");
  // }
  }//if(!error) ends here

  else{
    console.log('Error found : ', error);
  }
});



///////////////////////// generation starts here...///////////////////////////////


//mongoose model for generation defind here
//var generation = mongoose.model('generation', kappasSchema);

// x('http://www.generation.com.pk/sale', 'products-grid .item',[{
//   name:'.product-info .product-name h2 a',
//   sale_price:'.product-info .price-box .special-price .price',
//   original_price:'.product-info .price-box .old-price .price',
//   sale:'',
//   image:('.shop-item .overlay-wrapper a .pro-img img@src')
// }])(function(error, chen){
//   if ( !error ) {
// console.log(chen.length);
//   for(var i=0; i< chen.length; i++){
//
//     var generationdb = new Product({
//       id:i+1,
//       name: chen[i].name,
//     	sale_price: chen[i].sale_price,
//       original_price: chen[i].original_price,
//       sale: chen[i].sale,
//       image: chen[i].image
//     });
//
//     generationdb.save((err, doc) => {
//     	if (err) { console.log('err', err)}
//     		else {
//         }
//   });
//
//   }  //for loop end here
//   console.log('generation data saved to database');
//
//   //drop database - following code is added to avoid duplicate data from scrapping
//   // db.collection("generations").drop(function(err, delOK) {
//   //     if (err) throw err;
//   //     if (delOK) console.log("generation duplicate data deleted");
//   //   });//drop database ends here
//
//   }//if(!error) ends here
//
//   else{
//     console.log('Error found : ', error);
//   }
// });

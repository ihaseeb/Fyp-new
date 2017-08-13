var Xray = require('x-ray');
var request = require('request');
var fs = require('fs');
var x = new Xray();
var mongoose = require('mongoose');

var Khaadi = require('../models/khaadi');
var amir_adnan = require('../models/amir_adnan');
var generation = require('../models/generation');





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




x('http://www.generation.com.pk/sale', '.products-grid .item',[{
  name:'.product-info .product-name a',
  sale_price:'.product-info .price-box .special-price .price',
  original_price:'.product-info .price-box .old-price .price',
  image:('.hideableHover img@src'),
  link:('.actions a@href')
}])(function(error, result){
  if ( !error ) {

    console.log(result);

  for(var i=0; i< result.length; i++){

    // Original price parsing for sale calculation
    var org_price = result[i].original_price.split(" ");
    var org_price_int = org_price[1].split(",");
    var org_price_parse1 = parseInt(org_price_int[0]);
    var org_price_parse2 = parseInt(org_price_int[1]);

    var org_decimal_price = 0;
    var final_org= 0;

    for(var j=0;j<org_price_parse1;j++ ){
      org_decimal_price = org_price_parse1*1000;
    }
    final_org = org_decimal_price+org_price_parse2;


    // sale price parsing for sale calculation
    var sale_price = result[i].sale_price.split(" ");
    var sale_price_int = sale_price[1].split(",");
    var sale_price_parse1 = parseInt(sale_price_int[0]);
    var sale_price_parse2 = parseInt(sale_price_int[1]);

    var sale_decimal_price = 0;
    var final_sale= 0;

    for(var k=0;k<sale_price_parse1;k++ ){
      sale_decimal_price = sale_price_parse1*1000;
    }
    final_sale = sale_decimal_price+sale_price_parse2;


    var strsale = (((final_org)-(final_sale))/final_org)*100;


// category
    var cat = "";
    var str = result[i].name;
    if (str.toLowerCase().indexOf("shirt") >= 0|| str.toLowerCase().indexOf("kurt") >= 0  || str.toLowerCase().indexOf("top") >= 0){
      cat="shirt";
    }

    else
      if (str.toLowerCase().indexOf("shalwar") >= 0|| str.toLowerCase().indexOf("pant") >= 0|| str.toLowerCase().indexOf("tight") >= 0){
        cat="pant";
      }

    else
      if (str.toLowerCase().indexOf("necklace")>= 0 || str.toLowerCase().indexOf("ring") >= 0){
        cat="jewellery";
      }

    else
      {
        cat="dress";
      }


    var generationdb = new generation({

      name: result[i].name,
    	sale_price: result[i].sale_price,
      original_price: result[i].original_price,
      sale: Math.floor(strsale)+"%",
      image: result[i].image,
      link: result[i].link,
      category: cat
    });

    // console.log(result[i].sale);

    generationdb.save((err, doc) => {
    	if (err) { console.log('err',err)}
    		else {
        }
  });




  }  //for loop end here
  console.log('Generation data saved to database');

  //drop database - following code is added to avoid duplicate data from scrapping
  // if(db.collection('amir_adnans').find()=true){
  db.collection("generations").drop(function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log("generations duplicate data deleted");
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

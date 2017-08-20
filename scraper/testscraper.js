var Xray = require('x-ray');
var request = require('request');
var fs = require('fs');
var x = new Xray();
var mongoose = require('mongoose');

var khaas = require('../models/khaas');
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




x('https://www.khasstores.com/collections/sale?view=all', '.products-grid .grid-item',[{
  name:'.inner-top .product-bottom a',
  sale_price:'.product-bottom .price-box .sale .special-price .money',
  original_price:'.product-bottom .price-box .sale .old-price .money',
  image:('.product-top .product-image a img@src'),
  link:('.product-top .product-image a@href')
}])(function(error, result){
  if ( !error ) {

    // console.log(result);

  for(var i=0; i< result.length; i++){

    // Original price parsing for sale calculation

    var org_price = result[i].original_price.split(".");
    if (org_price[1].indexOf(",") >= 0 ) {
      var org_price_int = org_price[1].split(",");
      // console.log('if is working for:  ' + i + " where price is " +org_price_int);
    }
    else{
      var org_price_int = org_price[1];
      // console.log('else is working for:  '+ i + " where price is " + org_price_int);
    }
    if (org_price[1].indexOf(",") >= 0 ) {
    var org_price_parse1 = parseInt(org_price_int[0]);
    var org_price_parse2 = parseInt(org_price_int[1]);




    var org_decimal_price = 0;
    var final_org= 0;

    for(var j=0;j<org_price_parse1;j++ ){
      org_decimal_price = org_price_parse1*1000;
    }
    final_org = org_decimal_price+org_price_parse2;
}
  else{
    final_org = org_price_int;
  }


    // sale price parsing for sale calculation
    var sale_price = result[i].sale_price.split(".");


    if (sale_price[1].indexOf(",") >= 0 ) {
      var sale_price_int = sale_price[1].split(",");
    }
    else{
      var sale_price_int = sale_price[1];
    }
    if (sale_price[1].indexOf(",") >= 0 ) {
    var sale_price_parse1 = parseInt(sale_price_int[0]);
    var sale_price_parse2 = parseInt(sale_price_int[1]);

    var sale_decimal_price = 0;
    var final_sale= 0;

    for(var k=0;k<sale_price_parse1;k++ ){
      sale_decimal_price = sale_price_parse1*1000;
    }
    final_sale = sale_decimal_price+sale_price_parse2;
}
else{
  final_sale = sale_price_int;
}

    var strsale = (((final_org)-(final_sale))/final_org)*100;




// category
    var cat = "";
    var str = result[i].link;
    if (str.toLowerCase().indexOf("bed") >= 0|| str.toLowerCase().indexOf("sheet") >= 0){
      cat = "bed sheet";
    }

    else
      if (str.toLowerCase().indexOf("kurt") >= 0){
        cat = "shirt";
      }
      else
        if (str.toLowerCase().indexOf("suit") >= 0){
          cat = "dress";
        }
        else
        if (str.toLowerCase().indexOf("kce") >= 0||
         str.toLowerCase().indexOf("kne") >= 0||
         str.toLowerCase().indexOf("kse") >= 0||
         str.toLowerCase().indexOf("knac") >= 0||
         str.toLowerCase().indexOf("kl") >= 0||
         str.toLowerCase().indexOf("dr") >= 0
       ){
          cat = "dress";
        }
        else {
          cat = "bed sheet"
        }




    var khaasdb = new khaas({

      name: result[i].name,
    	sale_price: result[i].sale_price,
      original_price: result[i].original_price,
      sale: Math.floor(strsale)+"%",
      image: result[i].image,
      link: result[i].link,
      category: cat
    });

    // console.log(result[i].sale);

    khaasdb.save((err, doc) => {
    	if (err) { console.log('err',err)}
    		else {
        }
  });




  }  //for loop end here
  console.log('Khaas data saved to database');

  //drop database - following code is added to avoid duplicate data from scrapping
  // if(db.collection('amir_adnans').find()=true){
  db.collection("khaas").drop(function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log("khaas duplicate data deleted");
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

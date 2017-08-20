var Xray = require('x-ray');
var request = require('request');
var fs = require('fs');
var x = new Xray();
var mongoose = require('mongoose');

var Khaadi = require('../models/khaadi');
var amir_adnan = require('../models/amir_adnan');
var generation = require('../models/generation');
var khaas = require('../models/khaas');





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



////////////////////////// Khaadi starts here....///////////////////////////////
//
// xray scrapping for khaadi starts here
x('https://www.khaadionline.com/pk/sale.html?limit=60', '.products_grid .product-grid', [{

  name: '.product-name a',
  sale_price: '.special-price .price',
  original_price: '.old-price .price',
  sale: '.imgContainer .badge',
  image: ('.imgContainer .test img@src'),
  link: ('.imgContainer a@href')

}])(function(error, khd) {

  if (!error) {

    for (var i = 0; i < khd.length; i++) {

      var cat = "";
      var str = khd[i].name;
      if (str.toLowerCase().indexOf("shirt") >= 0 || str.toLowerCase().indexOf("kurta") >= 0) {
        cat = "shirt";
      } else
      if (str.toLowerCase().indexOf("shalwar") >= 0 || str.toLowerCase().indexOf("pant") >= 0 || str.toLowerCase().indexOf("tight") >= 0) {
        cat = "pant";
      } else
      if (str.toLowerCase().indexOf("necklace") >= 0 || str.toLowerCase().indexOf("ring") >= 0 || str.toLowerCase().indexOf("ear") >= 0) {
        cat = "jewellery";
      } else {
        cat = "dress";
      }

      var khaadidb = new Khaadi({

        name: khd[i].name,
        sale_price: khd[i].sale_price,
        original_price: khd[i].original_price,
        sale: khd[i].sale,
        image: khd[i].image,
        link: khd[i].link,
        category: cat
      });

      khaadidb.save((err, doc) => {
        if (err) {
          console.log('err', err)
        } else {}
      });

    } //for loop end here
    console.log('khaadi data saved to databse');


    //drop database - following code is added to avoid duplicate data from scrapping
    db.collection("khaadis").drop(function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log("khaadi duplicate data deleted");
    }); //drop database ends here

  } //if(!error) ends here
  else {
    console.log('Error found : ', error);
  }
}); // x inner ends
//
//
// ///////////////////////// Amir adnan starts here.../////////////////////////////
//
//
x('http://www.amiradnan.com/shalwar-kameez-kurta-sale', '.products .col-md-3', [{
  name: '.product-name h4 a',
  sale_price: '.product-price .new_price',
  original_price: '.product-price .old_price',
  sale: '.product-img .percent',
  image: ('.product-img img@src'),
  link: ('.product-img a@href')
}])(function(error, result) {
  if (!error) {


    for (var i = 0; i < result.length; i++) {

      var strsale = "";
      var tempsale = "";

      if (typeof result[i].sale == 'string') {
        strsale = result[i].sale;
        tempsale = strsale.split(" ", 1);
      } else
      if (typeof result[i].sale !== 'string') {
        tempsale = "10%";
      }



      var tempsale = strsale.split(" ", 1);

      var cat = "";
      var str = result[i].name;
      if (str.toLowerCase().indexOf("shirt") >= 0 || str.toLowerCase().indexOf("kurta") >= 0) {
        cat = "shirt";
      } else
      if (str.toLowerCase().indexOf("shalwar") >= 0 || str.toLowerCase().indexOf("pant") >= 0 || str.toLowerCase().indexOf("tight") >= 0) {
        cat = "pant";
      } else
      if (str.toLowerCase().indexOf("necklace") >= 0 || str.toLowerCase().indexOf("ring") >= 0) {
        cat = "jewellery";
      } else {
        cat = "dress";
      }


      var amiradnandb = new amir_adnan({

        name: result[i].name,
        sale_price: result[i].sale_price,
        original_price: result[i].original_price,
        sale: tempsale,
        image: result[i].image,
        link: result[i].link,
        category: cat
      });

      // console.log(result[i].sale);

      amiradnandb.save((err, doc) => {
        if (err) {
          console.log('err')
        } else {}
      });




    } //for loop end here
    console.log('Amir adnan data saved to database');

    //drop database - following code is added to avoid duplicate data from scrapping
    // if(db.collection('amir_adnans').find()=true){
    db.collection("amir_adnans").drop(function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log("amir adnan duplicate data deleted");
    }); //drop database ends here
    // }
    // else{
    //   console.log("no database exit atm");
    // }
  } //if(!error) ends here
  else {
    console.log('Error found : ', error);
  }
});



///////////////////////// generation starts here...///////////////////////////////


x('http://www.generation.com.pk/sale', '.products-grid .item',[{
  name:'.product-info .product-name a',
  sale_price:'.product-info .price-box .special-price .price',
  original_price:'.product-info .price-box .old-price .price',
  image:('.hideableHover img@src'),
  link:('.actions a@href')
}])(function(error, result){
  if ( !error ) {

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


///////////////////////// Khaas starts here...///////////////////////////////

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

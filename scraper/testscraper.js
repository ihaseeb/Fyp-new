var Xray = require('x-ray');
var request = require('request');
var fs = require('fs');
var x = new Xray();
var mongoose = require('mongoose');

var khaas = require('../models/khaas');
var amir_adnan = require('../models/amir_adnan');
var generation = require('../models/generation');

var count = 1;



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
          if (count >1)
          {
            console.log(count,' Products with missing data were found');
              count++;
          }
          else
          {
            console.log(count,' Product with missing data was found');
              count++;
          }

        } else {}
      });




    } //for loop end here
    console.log('Amir adnan data saved to database');

    //drop database - following code is added to avoid duplicate data from scrapping
    // if(db.collection('amir_adnans').find()=true){

    if(result.length>0){
      db.collection("amir_adnans").drop(function(err, delOK) {
          if (err) throw err;
          if (delOK) console.log("amir_adnans duplicate data deleted");
        });
    }
     //drop database ends here
    // }
    // else{
    //   console.log("no database exit atm");
    // }
  } //if(!error) ends here
  else {
    console.log('Error found : ', error);
  }
});

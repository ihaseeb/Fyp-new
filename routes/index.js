var express = require('express');
var router = express.Router();

var Khaadi = require('../models/khaadi');
var aa = require('../models/amir_adnan');
var generation =  require('../models/generation');


// route for home page
router.get('/', function(req, res, next) {

  Khaadi.find(function(err, khaadi_result){
    if(err){
      res.render('Error found');
    }
      else{
      aa.find(function(err, aa_result){
        if(err){
          res.render('Error found');
        }
        else{
          generation.find(function(err, generation_result){
            if(err){
              res.render('Error found');
            }
            else{
            res.render('brand/index', { title: 'Home', aas: aa_result, khaadis: khaadi_result, generations: generation_result });
          }
      });
      }
    });
    }
  });
});

// route for contact-us page
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Us' });
});

// route for about-us page
router.get('/about-us', function(req, res, next) {
  res.render('about-us', { title: 'About Us' });
});



// route for khaadi brand page
router.get('/khaadi', function(req, res, next) {

  Khaadi.find(function(err, results){

      res.render('brand/khaadi', { title: 'Khaadi', khaadis: results });

  });

});

// route for Amir_adnan brand page
router.get('/amiradnan', function(req, res, next) {

  aa.find(function(err, docs){

      res.render('brand/amiradnan', { title: 'Amir Adnan', aas: docs });

  });

});

// route for Generation brand page
router.get('/generation', function(req, res, next) {

  generation.find(function(err, docs){

      res.render('brand/generation', { title: 'Generation', generations: docs });

  });

});




module.exports = router;

var express = require('express');
var router = express.Router();
var List = require('../models/list');

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

router.get('/add-to-list/:id', function(req, res, next) {
  var productId = req.params.id;
  var list = new List(req.session.list ? req.session.list : {items: {}});

  Khaadi.findById(productId, function(err, product) {
    if(err) {
      return res.redirect('/');
    }
    list.add(product, product.id);
    req.session.list = list;
    console.log(req.session.list);
    res.redirect('/khaadi');
  });
});

router.get('/clear-list', function(req, res, next) {

    req.session.list = null;
    res.redirect('/');
  });



module.exports = router;

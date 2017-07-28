var express = require('express');
var router = express.Router();
var Khaadi = require('../models/khaadi');
var aa = require('../models/amir_adnan');

// route for home page
router.get('/', function(req, res, next) {
  Khaadi.find(function(err, results){
    aa.find(function(err, docs){
      res.render('brand/index', { title: 'Home', aas: docs, khaadis: results });
    });
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

// route for signin page
router.get('/signin', function(req, res, next) {
  res.render('user/signin', { title: 'Sign in' });
});

// route for signup page
router.get('/signup', function(req, res, next) {
  res.render('user/signup', { title: 'Sign up' });
});

// route for profile page
router.get('/profile', function(req, res, next) {
  res.render('user/profile', { title: 'Profile' });
});

// route for khaadi brand page
router.get('/khaadi', function(req, res, next) {

  Khaadi.find(function(err, results){

      res.render('brand/khaadi', { title: 'Khaadi', khaadis: results });

  });

});



module.exports = router;

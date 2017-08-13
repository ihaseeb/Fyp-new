var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

// route for profile page
router.get('/profile',isLoggedIn, function(req, res, next) {
  res.render('user/profile', { title: 'Profile' });
});

router.get('/logout', function(req, res, next){
    req.logout();
    res.redirect('/');

});

router.use('/', notLoggedIn, function(req, res, next){
    next();
});

// route for signin page
router.get('/signin', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', { title: 'Sign In', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});

});

router.post('/signin', passport.authenticate('local.signin',{
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));

// route for signup page
router.get('/signup', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', { title: 'Sign up', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup',{
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));



module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

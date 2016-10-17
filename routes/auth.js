var express = require('express');
var router = express.Router();

var passport = require('passport');

// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect : '/',
    failureRedirect : '/',
    failureFlash: true
  }));

// router.get(
//   '/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

module.exports = router;

var express = require('express');
var router = express.Router();

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

function findOrCreateUser(userInfo, next) {
  console.log(userInfo);

  var err;
  var user = 'testuser';

  // Find user by googleId in database

  if (err) {
    return next(err, null);
  } else if (user) {
    return next(null, user);
  } else {
    var newUser = new User();

    newUser.google.id    = profile.id;
    newUser.google.token = token;
    newUser.google.name  = profile.displayName;
    newUser.google.email = profile.emails[0].value;

    newUser.save(function(err) {
      if (err) {
        throw err;
      }
      return next(null, newUser);
    });
  }
}

passport.use(new GoogleStrategy(
  {
    clientID: '709062297907-1cuaikiueqp3p4iaph1eptdditm4oc9d.apps.googleusercontent.com',
    clientSecret: 'pw8uooENPrFptdmhxwtQGHOo',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    findOrCreateUser({ googleId: profile.id }, function(err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/* GET home page */
router.get('/', function(req, res, next) {
  res.sendFile('/public/index.html');
});

module.exports = router;

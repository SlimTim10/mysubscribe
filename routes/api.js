var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET api page. */
router.get('/', function(req, res, next) {
  res.send('access to API');
});

// API routing
router.get('/users', db.getAllUsers);
router.get('/users/:id', db.getSingleUser);
router.post('/users', db.createUser);
router.put('/users/:id', db.updateUser);
router.delete('/users/:id', db.removeUser);

router.get('/subscriptions', db.getAllSubscriptions);
router.get('/subscriptions/:id', db.getSingleSubscription);
router.post('/subscriptions', db.createSubscription);
router.put('/subscriptions/:id', db.updateSubscription);
router.delete('/subscriptions/:id', db.removeSubscription);

router.get('/directories', db.getAllDirectories);
router.get('/directories/user/:userID/subscription/:subscriptionID', db.getSingleDirectory);
router.get('/directories/user/:userID', db.getSubscriptionsOfUser);
router.get('/directories/subscription/:subscriptionID', db.getUsersOfSubscription);
router.post('/directories', db.createDirectory);
router.delete('/directories/user/:userID/subscription/:subscriptionID', db.removeDirectory);

module.exports = router;

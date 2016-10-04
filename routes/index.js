var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// API routing
router.get('/api/users', db.getAllUsers);
router.get('/api/users/:id', db.getSingleUser);
router.post('/api/users', db.createUser);
router.put('/api/users/:id', db.updateUser);
router.delete('/api/users/:id', db.removeUser);

router.get('/api/subscriptions', db.getAllSubscriptions);
router.get('/api/subscriptions/:id', db.getSingleSubscription);
router.post('/api/subscriptions', db.createSubscription);
router.put('/api/subscriptions/:id', db.updateSubscription);
router.delete('/api/subscriptions/:id', db.removeSubscription);

router.get('/api/directories', db.getAllDirectories);
router.get('/api/directories/user/:userId/subscription/:subscriptionId', db.getSingleDirectory);
router.get('/api/directories/user/:userId', db.getSubscriptionsOfUser);
router.get('/api/directories/subscription/:subscriptionId', db.getUsersOfSubscription);
router.post('/api/directories', db.createDirectory);
router.put('/api/directories/user/:userId/subscription/:subscriptionId', db.updateDirectory);
router.delete('/api/directories/user/:userId/subscription/:subscriptionId', db.removeDirectory);


module.exports = router;

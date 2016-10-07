var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pg = require('pg-promise')(options);
var connectionString = 'postgres://postgres:admin@localhost:5432/mysubscribedb';
var db = pg(connectionString);

function getAllUsers(req, res, next) {
  db.any('SELECT * FROM Users')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          body: data,
          message: 'Retrieved all users'
        });
    })
    .catch( err => next(err) );
}

function getSingleUser(req, res, next) {
  var userID = parseInt(req.params.id);
  db.one('SELECT * FROM Users WHERE user_id = $1',
         userID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          body: data,
          message: 'Retrieved one user'
        });
    })
    .catch( err => next(err) );
}

function createUser(req, res, next) {
  db.none('INSERT INTO Users(user_name) VALUES($1)',
          req.body.name)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one user'
        });
    })
    .catch( err => next(err) );
}

function updateUser(req, res, next) {
  var userID = parseInt(req.params.id);
  db.none('UPDATE Users SET user_name=$2 WHERE user_id = $1',
          [userID, req.body.name])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated user'
        });
    })
    .catch( err => next(err) );
}

function removeUser(req, res, next) {
  var userID = parseInt(req.params.id);
  db.result('DELETE FROM Users WHERE user_id = $1',
            userID)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} users`
        });
    })
    .catch( err => next(err) );
}

function getAllSubscriptions(req, res, next) {
  db.any('SELECT * FROM Subscriptions')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          body: data,
          message: 'Retrieved all subscriptions'
        });
    })
    .catch( err => next(err) );
}

function getSingleSubscription(req, res, next) {
  var subscriptionID = parseInt(req.params.id);
  db.one('SELECT * FROM Subscriptions WHERE subscription_id = $1',
         subscriptionID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          body: data,
          message: 'Retrieved one subscription'
        });
    })
    .catch( err => next(err) );
}

function createSubscription(req, res, next) {
  db.none('INSERT INTO Subscriptions(name, url) values($1, $2)',
          [req.body.name, req.body.url])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one subscription'
        });
    })
    .catch( err => next(err) );
}

function updateSubscription(req, res, next) {
  var subscriptionID = parseInt(req.params.id);
  db.none('UPDATE Subscriptions SET name = $2, url = $3 WHERE subscription_id = $1',
          [subscriptionID, req.body.name, req.body.url])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated subscription'
        });
    })
    .catch( err => next(err) );
}

function removeSubscription(req, res, next) {
  var subscriptionID = parseInt(req.params.id);
  db.result('DELETE FROM Subscriptions WHERE subscription_id = $1',
            subscriptionID)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} subscriptions`
        });
    })
    .catch( err => next(err) );
}

function getAllDirectories(req, res, next) {
  db.any('SELECT * FROM Directories')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          body: data,
          message: 'Retrieved all directories'
        });
    })
    .catch( err => next(err) );
}

function getSingleDirectory(req, res, next) {
  var userID = parseInt(req.params.userID);
  var subscriptionID = parseInt(req.params.subscriptionID);
  db.one('SELECT * FROM Directories WHERE user_id = $1 AND subscription_id = $2',
         [userID, subscriptionID])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          body: data,
          message: 'Retrieved one subscription'
        });
    })
    .catch( err => next(err) );
}

function getSubscriptionsOfUser(req, res, next) {
  var userID = parseInt(req.params.userID);
  db.any('SELECT s.* ' +
         'FROM Subscriptions AS s JOIN Directories AS d ON (s.subscription_id = d.subscription_id) ' +
         'WHERE d.user_id = $1',
         userID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          body: data,
          message: 'Retrieved subscriptions'
        });
    })
    .catch( err => next(err) );
}

function getUsersOfSubscription(req, res, next) {
  var subscriptionID = parseInt(req.params.subscriptionID);
  db.any('SELECT u.* ' +
         'FROM Users AS u JOIN Directories AS d ON (u.user_id = d.user_id) ' +
         'WHERE d.subscription_id = $1',
         subscriptionID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          body: data,
          message: 'Retrieved users'
        });
    })
    .catch( err => next(err) );
}

function createDirectory(req, res, next) {
  db.none('INSERT INTO Directories(user_id, subscription_id) values($1, $2)',
          [req.body.userid, req.body.subscriptionid])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one directory'
        });
    })
    .catch( err => next(err) );
}

function removeDirectory(req, res, next) {
  var userID = parseInt(req.params.userID);
  var subscriptionID = parseInt(req.params.subscriptionID);
  db.result('DELETE FROM Directories WHERE user_id = $1 AND subscription_id = $2',
            [userID, subscriptionID])
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} directories`
        });
    })
    .catch( err => next(err) );
}


module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser,
  getAllSubscriptions: getAllSubscriptions,
  getSingleSubscription: getSingleSubscription,
  createSubscription: createSubscription,
  updateSubscription: updateSubscription,
  removeSubscription: removeSubscription,
  getAllDirectories: getAllDirectories,
  getSingleDirectory: getSingleDirectory,
  getSubscriptionsOfUser: getSubscriptionsOfUser,
  getUsersOfSubscription: getUsersOfSubscription,
  createDirectory: createDirectory,
  removeDirectory: removeDirectory,
};

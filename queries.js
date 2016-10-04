var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pg = require('pg-promise')(options);
var connectionString = 'postgres://postgres:admin@localhost:5432/mysubscribedb';
var db = pg(connectionString);

function getAllUsers(req, res, next) {
  db.any('select * from users')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all users'
        });
    })
    .catch( err => next(err) );
}

function getSingleUser(req, res, next) {
  var userID = parseInt(req.params.id);
  db.one('select * from users where user_id = $1', userID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one user'
        });
    })
    .catch( err => next(err) );
}

function createUser(req, res, next) {
  db.none('insert into users(user_name) values($1)', [req.body.name])
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
  db.none('update users set user_name=$2 where user_id=$1', [userID, req.body.name])
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
  db.result('delete from users where user_id=$1', userID)
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
  ;
}

function getSingleSubscription(req, res, next) {
  ;
}

function createSubscription(req, res, next) {
  ;
}

function updateSubscription(req, res, next) {
  ;
}

function removeSubscription(req, res, next) {
  ;
}

function getAllDirectories(req, res, next) {
  ;
}

function getSingleDirectory(req, res, next) {
  ;
}

function getSubscriptionsOfUser(req, res, next) {
  ;
}

function getUsersOfSubscription(req, res, next) {
  ;
}

function createDirectory(req, res, next) {
  ;
}

function updateDirectory(req, res, next) {
  ;
}

function removeDirectory(req, res, next) {
  ;
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
  updateDirectory: updateDirectory,
  removeDirectory: removeDirectory,
};

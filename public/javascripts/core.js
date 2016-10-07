var mySubscribe = angular.module('mySubscribe', []);

mySubscribe.controller('MainController', ['$scope', '$http', function($scope, $http) {
  
  $http.get('/api/users')
    .then(function(data) {
      if (data.status === 200 && data.data.status === 'success') {
        $scope.users = data.data.body;
      }
      console.log(data);
    })
    .catch(function(data) {
      console.log(`Error: ${data}`);
    });

  $http.get('/api/subscriptions')
    .then(function(data) {
      if (data.status === 200 && data.data.status === 'success') {
        $scope.subscriptions = data.data.body;
      }
      console.log(data);
    })
    .catch(function(data) {
      console.log(`Error: ${data}`);
    });

  $http.get('/api/directories')
    .then(function(data) {
      if (data.status === 200 && data.data.status === 'success') {
        $scope.directories = data.data.body;
      }
      console.log(data);
    })
    .catch(function(data) {
      console.log(`Error: ${data}`);
    });
  
}]);

'use strict';

angular.module('ssc')
  .controller('LoginCtrl', function ($scope ,$rootScope, $http, $location) {
    $scope.user = {};    
  // Register the login() function
  $scope.login = function(){
    $rootScope.err = false;      
    $http.post('/login', {
      username: $scope.user.username,
      password: $scope.user.password,
    })
    .success(function(user){
      // No error: authentication OK
      $rootScope.err = false;      
      $rootScope.message = '';      
      $location.url('/dashboard');
    })
    .error(function(){
      // Error: authentication failed
      $rootScope.err = true;
      $rootScope.message = 'Please enter correct username and password';
      $location.url('/login');
    });
  };
    
  });

'use strict';

angular.module('ssc')
  .controller('HeaderCtrl', [ '$scope', '$location', '$http',function ($scope, $location, $http) {
    $scope.date = new Date();        
    
  }]);

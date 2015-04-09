'use strict';

angular.module('ssc')
  .controller('NavbarCtrl', [ '$scope', '$location', '$http',function ($scope, $location, $http) {
    $scope.date = new Date();
        
    $scope.menu = [{
      'title': 'Home',
      'link': '#/',
      'font': 'fa fa-home',
    },{
      'title': 'Dashboard',
      'link' :'#/dashboard',
      'font': 'fa fa-dashboard',
    /*},{
      'title': 'Login',
      'link' :'#/login',
      'font': 'fa fa-sign-in',
    }
    ,{
      'title': 'Logout',
      'link' :'#/logout',
      'font': 'fa fa-sign-out',*/
    }
    ];    
    $scope.isActive = function(route) {           
      route = route.substring(1, route.length); //remove # from begining from route variable 
      return route === $location.path();
    };
  }]);

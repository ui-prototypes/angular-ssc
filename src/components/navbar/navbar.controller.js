'use strict';

angular.module('ssc')
  .controller('NavbarCtrl', [ '$scope', '$location', function ($scope, $location) {
    $scope.date = new Date();
    $scope.menu = [{
      'title': 'Home',
      'link': '#/',
      'font': 'fa fa-home',
    },{
      'title': 'Dashboard',
      'link' :'#/dashboard',
      'font': 'fa fa-dashboard',
    },{
      'title': 'About',
      'link' :'#/about',
      'font': 'fa fa-info',
    },{
      'title': 'Contact',
      'link' :'#/contact',
      'font': 'fa fa-phone',
    },{
      'title': 'Registration',
      'link' :'#/registration',
      'font': 'fa fa-server',
    },{
      'title': 'Login',
      'link' :'#/login',
      'font': 'fa fa-lock',
    }];    
    $scope.isActive = function(route) {           
      route = route.substring(1, route.length); //remove # from begining from route variable 
      return route === $location.path();
    };
  }]);

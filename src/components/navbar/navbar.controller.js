'use strict';

angular.module('ssc')
  .controller('NavbarCtrl', [ '$scope', '$location', function ($scope, $location) {
    $scope.date = new Date();
    $scope.menu = [{
      'title': 'Home',
      'link': '#/'
    },{
    	'title': 'Dashboard',
    	'link' :'#/dashboard'
    },{
    	'title': 'About',
    	'link' :'#/about'
    },{
      'title': 'Contact',
      'link' :'#/contact'
    },{
      'title': 'Registration',
      'link' :'#/registration'
    },{
      'title': 'Login',
      'link' :'#/login'
    }];    
    $scope.isActive = function(route) {    	    	
    	route = route.substring(1, route.length); //remove # from begining from route variable 
    	return route === $location.path();
    };
  }]);

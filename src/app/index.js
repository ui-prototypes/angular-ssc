'use strict';

angular.module('ssc', ['ngResource', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.grid', 'ui.grid.pagination'])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, $window){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated
        if (user !== '0')
          /*$timeout(deferred.resolve, 0);*/
          deferred.resolve();
        // Not Authenticated
        else {
          $rootScope.message = 'You need to log in.';
          //$timeout(function(){deferred.reject();}, 0);
          deferred.reject();
          $window.location = '#/login';          
        }
      });

      return deferred.promise;
    };

    //================================================
    
    //================================================
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
          // do something on success
          return response;
        },
        responseError: function(response) {
          if (response.status === 401)
            $location.url('/login');
          return $q.reject(response);
        }
      };
    });
    $stateProvider
      .state('home', {
        url: '/',
        views: {
          'header': {
                templateUrl: '/components/header/header.html',
                controller: 'HeaderCtrl'
            },
            'leftbar': {
                templateUrl: '/components/leftbar/leftbar.html',
                controller: 'LeftbarCtrl'
            },
            'breadcrumbs': {
                templateUrl: '/components/navbar/navbar.html',
                controller: 'NavbarCtrl'
            },
            'content': {
                templateUrl: '/components/main/main.html',
                controller: 'NavbarCtrl' 
            },
            /*'footer': {
                templateUrl: '/components/footer/footer.html',
                controller: 'FooterCtrl'
            }*/
        },
        resolve: {
          loggedin: checkLoggedin
        },
      })
      .state('login', {
        url: '/login',
        templateUrl: 'components/login/login.html',
        controller: 'LoginCtrl'
       })
      .state('home.dashboard', {
        url: 'dashboard',
        views: {            
            'content@': {
                templateUrl: 'components/dashboard/dashboard.html',
                controller: 'DashboardCtrl'
            },            
        } 
      })
      .state('home.support', {
        url: 'support',
        views: {            
            'content@': {
                templateUrl: 'components/support/support.html',
                controller: 'SupportCtrl'
            },            
        } 
      })
      .state('home.ih', {
        url: 'ih',
        views: {            
            'content@': {
                templateUrl: 'components/ih/ih.html',
                controller: 'IhCtrl'
            },            
        } 
      })
      .state('home.ihnetworking', {
        url: 'ihnetworking',
        views: {            
            'content@': {
                templateUrl: 'components/ihnetworking/ihnetworking.html',
                controller: 'IhnetworkingCtrl'
            },            
        } 
      })
      .state('home.instances', {
        url: 'instances',
        views: {            
            'content@': {
                templateUrl: 'components/instances/instances.html',
                controller: 'InstancesCtrl'
            },            
        } 
      })
      .state('home.appliance', {
        url: 'appliance',
        views: {            
            'content@': {
                templateUrl: 'components/appliance/appliance.html',
                controller: 'ApplianceCtrl'
            },            
        } 
      })
      .state('home.stmclusters', {
        url: 'stmclusters',
        views: {            
            'content@': {
                templateUrl: 'components/stmclusters/stmclusters.html',
                controller: 'StmclustersCtrl'
            },            
        } 
      });

    /*$stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'components/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          loggedin: checkLoggedin
        },
      })
      .state('login', {
        url: '/login',
        templateUrl: 'components/login/login.html',
        controller: 'LoginCtrl'
       })
      
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'components/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
       });      */
    $urlRouterProvider.otherwise('/login');
  })
  .run(function($rootScope, $http){
    $rootScope.message = '';
    // Logout function is available in any pages
    $rootScope.logout = function(){
      $rootScope.message = 'Logged out.';
      $http.post('/logout');
    };
  });


'use strict';

angular.module('ssc', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.grid', 'ui.grid.pagination'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'components/main/main.html',
        controller: 'MainCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'components/login/login.html',
        controller: 'LoginCtrl'
       })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'components/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
       })
      .state('about', {
        url: '/about',
        templateUrl: 'components/about/about.html',
        controller: 'AboutCtrl'
       })
      .state('contact', {
        url: '/contact',
        templateUrl: 'components/contact/contact.html',
        controller: 'ContactCtrl'
       })
      .state('registration', {
        url: '/registration',
        templateUrl: 'components/registration/registration.html',
        controller: 'RegistrationCtrl'
        
      });

    $urlRouterProvider.otherwise('/');
  })
;

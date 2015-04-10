
'use strict';

angular.module('ssc')
  .controller('BreadcrumbsCtrl', [ '$scope', '$location', '$http',function ($scope, $location, $http) {
    $scope.myResolver = function (defaultResolver, state, isCurrent) {
        console.log(defaultResolver);
    if (isCurrent) {
        return '"' + item.name + '"';
    }
    return defaultResolver(state);
  }
  }]);

'use strict';

angular.module('ssc')
  .controller('IhCtrl', function ($scope, WEB3_ENDPOINT, InstantHostService, ViewSpinner) {
  	ViewSpinner.spin();
  	$scope.gridOptions1 = {
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 5,
        columnDefs: [
        { name: 'id_name' },
        { name: 'status' },
        { name: 'username' },
        { name: 'cpu_cores' },
        { name: 'usage_info' },
        { name: 'host_version' },
        { name: 'info'}
        ]
    };
    $scope.gridOptions1.data = [];
  	InstantHostService.query({}, function(d){
      if (d.properties !== undefined){
        $scope.gridOptions1.data = d.properties.config.host;    
      }
      ViewSpinner.stop();

  	}, function(d){
      ViewSpinner.stop();
    });
  	
  });
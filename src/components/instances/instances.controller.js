'use strict';

angular.module('ssc')
  .controller('InstancesCtrl', function ($scope, WEB3_ENDPOINT, InstanceService, ViewSpinner) {
  	ViewSpinner.spin();
  	$scope.gridOptions1 = {
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 5,
        columnDefs: [
        { name: 'id_name' },
        { name: 'status' },
        { name: 'license_name' }
        ]
    };
  	InstanceService.query({}, function(d){  	  		
    $scope.gridOptions1.data = d.properties.config.instance;    
    ViewSpinner.stop();
  	});
  	
  });

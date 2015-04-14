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
        { name: 'bandwidth' },
        { name: 'stm_feature_pack'}
        ]
    };
  	InstantHostService.query({}, function(d){  	  		
    $scope.gridOptions1.data = d.properties.config.host;    
    ViewSpinner.stop();
  	});
  	
  });
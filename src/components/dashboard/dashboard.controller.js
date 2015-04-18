'use strict';

angular.module('ssc')
.controller('DashboardCtrl', function ($scope, DashboardService, ViewSpinner, $interval) {    
    $scope.dashboard = {};
    $scope.dashboard.cpu = 0;
    $scope.dashboard.memory = 0;
    $scope.dashboard.uptime = "";
    var gcpu = new JustGage({
                    id: "cpu_usage",
                    value: $scope.dashboard.cpu,
                    min: 0,
                    max: 100,
                    title: "CPU",
                    label: '%',
                });
    var gmemory = new JustGage({
                    id: "memory_usage",
                    value: $scope.dashboard.memory,
                    min: 0,
                    max: 100,
                    title: "Memory",                    
                });    
    $scope.dashboard_update = function(){ 
        //ViewSpinner.spin();
        $scope.loading = true;
        DashboardService.query({}, 
            function(d){

            if (d.properties !== undefined){                
                $scope.dashboard.cpu = d.properties.cpuUtil;
                $scope.dashboard.memory = d.properties.memoryUtil;
                $scope.dashboard.uptime = d.properties.uptimeStr;
                gcpu.refresh($scope.dashboard.cpu);
                gmemory.refresh($scope.dashboard.memory);
            }
            //ViewSpinner.stop();
            $scope.loading = false;
        }, function(d){
            //ViewSpinner.stop();
            $scope.loading = false;
        });
    };
    $scope.dashboard_update();

    // Start Interval
    var timerData = 
    $interval(function () {
        if(!$scope.loading){
           $scope.dashboard_update();
        }
    }, 10000);
});

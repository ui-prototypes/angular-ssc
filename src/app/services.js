angular.module('services', ['ngResource'])
    .factory('InstantHostService', function($resource, WEB3_ENDPOINT) {
        'use strict';
        var api_url = '/modules/ssc/ssc_host';
        // Resource for interacting with the docker containers
        // http://docs.docker.io/en/latest/api/docker_remote_api.html#containers
        return $resource(api_url, {
            name: '@name'
        }, {
            query: {method: 'GET', params:{}},            
        });
    })
    .factory('InstanceService', function($resource, WEB3_ENDPOINT) {
        'use strict';
        var api_url = '/modules/ssc/ssc_instance';
        // Resource for interacting with the docker containers
        // http://docs.docker.io/en/latest/api/docker_remote_api.html#containers
        return $resource(api_url, {
            name: '@name'
        }, {
            query: {method: 'GET', params:{}},            
        });
    })
    .factory('DashboardService', function($resource, WEB3_ENDPOINT) {
        'use strict';
        var api_url = '/modules/ssc/demo_status';
        // Resource for interacting with the docker containers
        // http://docs.docker.io/en/latest/api/docker_remote_api.html#containers
        return $resource(api_url, {
            name: '@name'
        }, {
            query: {method: 'GET', params:{}},            
        });
    })    
    .factory('ViewSpinner', function() {
        'use strict';
        var opts = {
          lines: 17, // The number of lines to draw
          length: 5, // The length of each line
          width: 7, // The line thickness
          radius: 7, // The radius of the inner circle
          corners: 1, // Corner roundness (0..1)
          rotate: 46, // The rotation offset
          direction: 1, // 1: clockwise, -1: counterclockwise
          color: '#000', // #rgb or #rrggbb or array of colors
          speed: 1, // Rounds per second
          trail: 50, // Afterglow percentage
          shadow: true, // Whether to render a shadow
          hwaccel: true, // Whether to use hardware acceleration
          className: 'spinner', // The CSS class to assign to the spinner
          zIndex: 2e9, // The z-index (defaults to 2000000000)
          top: '50%', // Top position relative to parent
          left: '50%' // Left position relative to parent
        };
        var spinner = new Spinner(opts);
        var target = document.getElementById('view');
        //var target = document.getElementsByClassName('.view_spinner');

        return {
            spin: function() { spinner.spin(target); },
            stop: function() { spinner.stop(); }
        };
    });
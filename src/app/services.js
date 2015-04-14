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
    .factory('ViewSpinner', function() {
        'use strict';
        var spinner = new Spinner();
        var target = document.getElementById('view');
        //var target = document.getElementsByClassName('.view_spinner');

        return {
            spin: function() { spinner.spin(target); },
            stop: function() { spinner.stop(); }
        };
    });
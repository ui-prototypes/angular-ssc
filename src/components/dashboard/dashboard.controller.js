'use strict';

angular.module('ssc')
.controller('DashboardCtrl', function ($scope) {    
    $scope.gridOptions1 = {
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 5,
        columnDefs: [
        { name: 'name' },
        { name: 'gender' },
        { name: 'company' }
        ]
    };



  /*$http.get('/data/100.json')
  .success(function (data) {
    $scope.gridOptions1.data = data;
    $scope.gridOptions2.data = data;
});*/
$scope.gridOptions1.data = [{
    'name': 'Ethel Price',
    'gender': 'female',
    'company': 'Enersol'
    },
    {'name': 'Valarie Atkinson',
    'gender': 'female',
    'company': 'Hopeli'
    },
    {'name': 'Schroeder Mathews',
    'gender': 'male',
    'company': 'Polarium'
    },
    {'name': 'Lynda Mendoza',
    'gender': 'female',
    'company': 'Dogspa'
    },
    {'name': 'Sarah Massey',
    'gender': 'female',
    'company': 'Bisba'
    },
    {'name': 'Dawson Barber',
    'gender': 'male',
    'company': 'Dymi'
    },
    {'name': 'Bruce Strong',
    'gender': 'male',
    'company': 'Xyqag'
    },
    {'name': 'Nellie Whitfield',
    'gender': 'female',
    'company': 'Exospace'
    },
    {'name': 'Jackson Macias',
    'gender': 'male',
    'company': 'Aquamate'
    },
    {'name': 'Pena Pena',
    'gender': 'male',
    'company': 'Quarx'
    },
    {'name': 'Lelia Gates',
    'gender': 'female',
    'company': 'Proxsoft'
    },
    {'name': 'Letitia Vasquez',
    'gender': 'female',
    'company': 'Slumberia'
    },
    {'name': 'Trevino Moreno',
    'gender': 'male',
    'company': 'Conjurica'
    },
    {'name': 'Barr Page',
    'gender': 'male',
    'company': 'Apex'
    }];
});

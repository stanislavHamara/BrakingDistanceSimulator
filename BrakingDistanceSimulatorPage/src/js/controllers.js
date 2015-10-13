angular.module('simulator.controllers', [])
    .controller('PropertiesController', ['$scope', 'Properties', function ($scope, Properties) {

        $("[name='my-checkbox']").bootstrapSwitch();

        $scope.surfaces = Properties.getSurfaces();
        $scope.weather = Properties.getWeather();

        $scope.speedButtons = ['-1','-5','-10','+10','+5','+1'];
    }]);

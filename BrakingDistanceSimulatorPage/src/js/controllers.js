angular.module('simulator.controllers', [])
    .controller('PropertiesController', ['$scope', 'Properties', function ($scope, Properties) {


        $scope.surfaces = Properties.getSurfaces();
        $scope.weather = Properties.getWeather();
        $scope.units = 'km/h';
        $scope.speed = 60;

        $scope.speedButtons = ['-1', '-5', '-10', '+10', '+5', '+1'];

        $scope.togglePreferences = {
            imperial: false,
            lookAround: true
        };

        $scope.setUnits = function () {
            $scope.units = $scope.togglePreferences.imperial ? 'mph' : 'km/h';
            $scope.speed = $scope.togglePreferences.imperial ? 40 : 60;
        };

        $scope.setSpeed = function (speed) {
            $scope.speed += parseInt(speed);
        };
    }]);

angular.module('Properties',[])
    .controller('PropertiesController', ['$scope', 'PropertiesService', function ($scope, PropertiesService) {
        $scope.surfaces = PropertiesService.getSurfaces();
        $scope.weather = PropertiesService.getWeather();
        $scope.units = 'km/h';
        $scope.speed = 60;

        $scope.speedButtons = [-1, -5, -10, +10, +5, +1];

        $scope.togglePreferences = {
            imperial: false,
            lookAround: true
        };

        $scope.setUnits = function () {
            $scope.units = $scope.togglePreferences.imperial ? 'mph' : 'km/h';
            $scope.speed = $scope.togglePreferences.imperial ? 40 : 60;
        };

        $scope.setSpeed = function (speed) {
            $scope.speed += speed;
        };

        $scope.setSurface = function (surfaceType) {
            PropertiesService.setSelectedSurface(surfaceType);
            //console.log(PropertiesService.getSelectedSurface());
        };

        $scope.checkSelectedSurface = function (surface) {
            return surface == PropertiesService.getSelectedSurface();
        };

        $scope.setWeather = function (weather) {
            PropertiesService.setSelectedWeather(weather);
            //console.log(PropertiesService.getSelectedWeather());
        };

        $scope.checkSelectedWeather = function (weather) {
            return weather == PropertiesService.getSelectedWeather();
        };

        $scope.startSimulation = function () {
            PropertiesService.setSpeed($scope.speed, $scope.units);
            console.log(PropertiesService.getSimulation());
            return PropertiesService.getSimulation();
        }
    }]);

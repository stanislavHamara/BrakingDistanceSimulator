angular.module('simulator.controllers', [])
    .controller('NavController', ['$scope','Properties', function($scope, Properties){
        $scope.surfaces = Properties.getSurfaces();
        $scope.weather = Properties.getWeather();
    }]);
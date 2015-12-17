angular.module('Properties', [])
    .controller('PropertiesController', ['$scope', 'PropertiesService', 'PhysicsService', 'CarService',
        function ($scope, PropertiesService, PhysicsService, CarService) {

            $scope.surfaces = PropertiesService.getSurfaces();
            $scope.condition = PropertiesService.getConditions();
            $scope.units = PropertiesService.getUnits() ? 'mph' : 'km/h';
            $scope.speed = PropertiesService.getSpeed();

            $scope.speedButtons = [-1, -5, -10, +10, +5, +1];

            $scope.togglePreferences = {
                imperial: true,
                lookAround: true
            };

            $scope.setUnits = function () {
                $scope.units = $scope.togglePreferences.imperial ? 'mph' : 'km/h';
                $scope.speed = $scope.togglePreferences.imperial ? 40 : 60;
            };

            $scope.setControls = function() {
                console.log('controls changed');
                PropertiesService.setControls($scope.togglePreferences.lookAround);
            };

            $scope.setSpeed = function (speed) {
                $scope.speed += speed;

                if ($scope.speed < 1) $scope.speed = 1;
                else if ($scope.speed > 200) $scope.speed = 200;
                PropertiesService.setSpeed($scope.speed, $scope.togglePreferences.imperial);

            };

            $scope.setSurface = function (surfaceType) {
                PropertiesService.setSelectedSurface(surfaceType);
            };

            $scope.checkSelectedSurface = function (surface) {
                return surface == PropertiesService.getSelectedSurface();
            };

            $scope.setCondition = function (condition) {
                PropertiesService.setSelectedCondition(condition);
            };

            $scope.checkSelectedCondition = function (condition) {
                return condition == PropertiesService.getSelectedCondition();
            };

            $scope.startSimulation = function () {
                if(validateSpeed()) {
                    var userInput = PropertiesService.getUserInput();
                    CarService.startSimulation();

                    console.log(PhysicsService.getStoppingDistance(userInput));
                    console.log(userInput);

                    return userInput;
                } else {
                    alert ('Invalid value. Speed must be a number between 1 and 200');
                }
            };

            var validateSpeed = function () {
                return $scope.speed > 0 && $scope.speed < 201;
            }
        }]);

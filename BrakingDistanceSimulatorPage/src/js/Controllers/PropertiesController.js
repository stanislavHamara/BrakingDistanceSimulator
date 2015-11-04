angular.module('Properties', [])
    .controller('PropertiesController', ['$scope', 'PropertiesService', 'PhysicsService',
        function ($scope, PropertiesService, PhysicsService) {

            $scope.surfaces = PropertiesService.getSurfaces();
            $scope.condition = PropertiesService.getConditions();
            $scope.units = 'mph';
            $scope.speed = 40;

            $scope.speedButtons = [-1, -5, -10, +10, +5, +1];

            $scope.togglePreferences = {
                imperial: true,
                lookAround: true
            };

            $scope.setUnits = function () {
                $scope.units = $scope.togglePreferences.imperial ? 'mph' : 'km/h';
                $scope.speed = $scope.togglePreferences.imperial ? 40 : 60;
            };

            $scope.setSpeed = function (speed) {
                $scope.speed += speed;

                if ($scope.speed < 1) $scope.speed = 1;
                else if ($scope.speed > 200) $scope.speed = 200;

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
                    PropertiesService.setSpeed($scope.speed, $scope.togglePreferences.imperial);
                    var userInput = PropertiesService.getUserInput();

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

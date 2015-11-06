angular.module('ResultModal', [])
    .controller('ResultModalController', ['$scope', 'PropertiesService', 'PhysicsService',
        function ($scope, PropertiesService, PhysicsService) {
            $scope.userInput = PropertiesService.getUserInput();

            $scope.getKphSpeed = function () {
                return parseFloat($scope.userInput.imperial ? $scope.userInput.speed * 1.6 : $scope.userInput.speed).toFixed(1);
            };

            $scope.getMphSpeed = function () {
                return parseFloat($scope.userInput.imperial ? $scope.userInput.speed : $scope.userInput.speed / 1.6).toFixed(1);
            };

            $scope.getDistances = function () {
                $scope.distances = PhysicsService.getStoppingDistance($scope.userInput);
                $scope.thinkingDistance = $scope.distances.thinkingDistance;
                $scope.brakingDistance = $scope.distances.brakingDistance;
                return {
                    thinkingDistance: formatNumber($scope.thinkingDistance) + ' m / '
                    + formatNumber($scope.thinkingDistance * 3.3) + ' feet',

                    brakingDistance: formatNumber($scope.brakingDistance) + ' m / '
                    + formatNumber($scope.brakingDistance * 3.3) + ' feet',

                    stoppingDistance: formatNumber($scope.thinkingDistance + $scope.brakingDistance) + ' m / '
                    + formatNumber(($scope.thinkingDistance + $scope.brakingDistance) * 3.3) + ' feet'
                };
            };

            var formatNumber = function (n) {
                return parseFloat(n).toFixed(2);
            }

        }]);

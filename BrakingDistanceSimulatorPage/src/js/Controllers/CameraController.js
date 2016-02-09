angular.module('Camera', [])
    .controller('CameraController', ['$scope', function ($scope) {
        $scope.currentCameraIndex = 1;

        $scope.setCamera = function (cameraIndex) {
            $scope.currentCameraIndex = cameraIndex;
        };

        $scope.checkSelectedCamera = function (cameraIndex) {
            return cameraIndex == $scope.currentCameraIndex;
        };
    }]);

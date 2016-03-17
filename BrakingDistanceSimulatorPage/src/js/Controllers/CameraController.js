angular.module('Camera', ['CameraService'])
    .controller('CameraController', ['$scope', 'CameraService', function ($scope, CameraService) {
        $scope.currentCameraIndex = 1;
        $scope.labels = ['SIDE','TOP','BACK'];

        $scope.setCamera = function (cameraIndex) {
            $scope.currentCameraIndex = cameraIndex;
            CameraService.setCamera(cameraIndex);
        };

        $scope.checkSelectedCamera = function (cameraIndex) {
            return cameraIndex == $scope.currentCameraIndex;
        };

        $scope.isDriving = function (){
            return $scope.currentCameraIndex == 4;
        }
    }]);

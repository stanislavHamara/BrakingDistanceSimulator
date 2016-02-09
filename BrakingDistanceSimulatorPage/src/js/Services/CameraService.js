angular.module('CameraService', [])
    .factory('CameraService', function () {
        var carCamera, carCamera2;
        carCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000000);
        carCamera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000000);
        carCamera.position.x = 470;
        carCamera.position.y = 100;

        return {
            getCamera: function(){
                return carCamera;
            }
        }
    });
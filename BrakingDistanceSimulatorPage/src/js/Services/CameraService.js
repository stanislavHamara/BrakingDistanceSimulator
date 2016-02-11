angular.module('CameraService', [])
    .factory('CameraService', function () {
        var carCamera, carCamera2, currentCamera;
        carCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000000);
        carCamera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000000);
        carCamera.position.x = 470;
        carCamera.position.y = 100;

        currentCamera = carCamera;

        return {
            getCamera: function () {
                return currentCamera;
            },
            setCamera: function (index) {
                switch (index) {
                    case 1:
                        currentCamera = carCamera;
                        break;
                    case 2:
                        currentCamera = carCamera2;
                        break;
                    default:
                        break;
                }
            }
        }
    });
angular.module('CameraService', [])
    .factory('CameraService', function () {
        var carCamera, carCamera2, carCamera3, currentCamera, cameraTarget, targetIndex;

        carCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000000);
        carCamera.position.x = 470;
        carCamera.position.y = 100;

        carCamera2 = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 2000000);
        carCamera2.position.y = 1000;

        carCamera3 = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 2000000);
        carCamera3.position.y = 120;
        carCamera3.position.z = -600;
        carCamera3.rotation.y = Math.PI;

        currentCamera = carCamera;
        targetIndex = 1;

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
                        currentCamera.lookAt(cameraTarget.root.position);
                        break;
                    case 3:
                        currentCamera = carCamera3;
                        break;

                    default:
                        break;
                }

                targetIndex = index;
            },
            setTarget: function (target) {
                cameraTarget = target;
            },
            updateCamera: function () {
                if (cameraTarget) {
                    switch (targetIndex) {
                        case 1:
                            currentCamera.lookAt(cameraTarget.root.position);
                            break;
                        case 2:
                            currentCamera.position.x = cameraTarget.root.position.x;
                            currentCamera.position.z = cameraTarget.root.position.z;
                            break;
                        case 3:
                            currentCamera.position.x = cameraTarget.root.position.x;
                            currentCamera.position.z = cameraTarget.root.position.z - 600;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    });
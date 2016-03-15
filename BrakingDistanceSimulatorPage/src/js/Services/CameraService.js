angular.module('CameraService', [])
    .factory('CameraService', function () {
        var carCamera, carCamera2, carCamera3, cubeCamera, currentCamera, cameraTarget, targetIndex;
        var element = document.getElementById('bds-threejs-container');
        var drivingCameraMode = false;

        carCamera = new THREE.PerspectiveCamera(75, element.offsetWidth / element.offsetHeight, 1, 2000000);
        carCamera.position.x = 470;
        carCamera.position.y = 200;
        carCamera.position.z = -100;

        carCamera2 = new THREE.PerspectiveCamera(75, element.offsetWidth / element.offsetHeight, 1, 2000000);
        carCamera2.position.y = 500;
        carCamera2.position.z = -200;

        carCamera3 = new THREE.PerspectiveCamera(75, element.offsetWidth / element.offsetHeight, 1, 2000000);
        carCamera3.position.y = 120;
        carCamera3.position.z = -200;
        carCamera3.rotation.y = Math.PI;

        cubeCamera = cameraCube = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000000);

        currentCamera = carCamera;
        targetIndex = 1;

        return {
            getCamera: function () {
                return currentCamera;
            },
            getCubeCamera: function () {
                return cubeCamera;
            },
            getDriving: function () {
                return drivingCameraMode;
            },
            setCamera: function (index) {
                drivingCameraMode = false;
                switch (index) {
                    case 1:
                        currentCamera = carCamera;
                        break;
                    case 2:
                        currentCamera = carCamera2;
                        break;
                    case 3:
                        currentCamera = carCamera3;
                        break;
                    case 4:
                        currentCamera = carCamera;
                        currentCamera.position.x = cameraTarget.root.position.x + 470;
                        currentCamera.position.z = cameraTarget.root.position.z + 150;
                        drivingCameraMode = true;
                        break;
                    default:
                        break;
                }
                currentCamera.lookAt(cameraTarget.root.position);
                targetIndex = index;
            },
            setTarget: function (target) {
                cameraTarget = target;
            },
            updateCamera: function () {
                if (cameraTarget) {
                    switch (targetIndex) {
                        case 1:
                            currentCamera.position.x = cameraTarget.root.position.x + 470;
                            currentCamera.position.z = cameraTarget.root.position.z - 100;
                            break;
                        case 2:
                            currentCamera.position.x = cameraTarget.root.position.x;
                            currentCamera.position.z = cameraTarget.root.position.z - 200;
                            break;
                        case 3:
                            currentCamera.position.x = cameraTarget.root.position.x;
                            currentCamera.position.z = cameraTarget.root.position.z - 600;
                            break;
                        default:
                            break;
                    }
                    currentCamera.lookAt(cameraTarget.root.position);
                    cubeCamera.rotation.copy(currentCamera.rotation);
                }

            }
        }
    });
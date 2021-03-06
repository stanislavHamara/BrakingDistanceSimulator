angular.module('OrbitControlsService', [])
    .factory('OrbitControlsService', function () {

        var controls;

        return {
            getControls: function (camera, element) {

                controls = new THREE.OrbitControls(camera, element);
                controls.maxPolarAngle = Math.PI / 2.2;
                controls.minPolarAngle = Math.PI / 3;
                controls.minDistance = 400;
                controls.maxDistance = 600;
                controls.enablePan = false;
                return controls;
            },
            isEnabled: function (enabled) {
                controls.enabled = enabled;
            }
        }
    });
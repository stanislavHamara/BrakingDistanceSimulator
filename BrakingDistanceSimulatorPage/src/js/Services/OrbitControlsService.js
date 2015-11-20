angular.module('OrbitControlsService', [])
    .factory('OrbitControlsService', function () {

        var OrbitControls = require('three-orbit-controls')(THREE);
        var controls;

        return {
            getControls: function (camera, element) {

                controls = new OrbitControls(camera, element);
                controls.maxPolarAngle = Math.PI / 2;
                controls.minPolarAngle = 1 / 4 * Math.PI;
                controls.minDistance = 500;
                controls.maxDistance = 700;
                controls.noPan = true;
                controls.target =  new THREE.Vector3(0,0,0);

                return controls;
            },
            isEnabled: function (enabled) {
                controls.enabled = enabled;
            }
        }
    });
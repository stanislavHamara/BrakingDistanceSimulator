angular.module('OrbitControlsService', [])
    .factory('OrbitControlsService', function () {

        var OrbitControls = require('three-orbit-controls')(THREE);
        var controls;

        return {
            getControls: function (camera, element) {

                controls = new OrbitControls(camera, element);
                controls.maxPolarAngle = Math.PI / 1.7;
                controls.minPolarAngle = 1 / 2.5 * Math.PI;
                controls.minDistance = 450;
                controls.maxDistance = 600;
                controls.noPan = true;
                controls.target =  new THREE.Vector3(0,0,0);

                return controls;
            },
            isEnabled: function (enabled) {
                controls.enabled = enabled;
            }
        }
    });
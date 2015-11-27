angular.module('OrbitControlsService', [])
    .factory('OrbitControlsService', function () {

        var OrbitControls = require('three-orbit-controls')(THREE);
        var controls;

        return {
            getControls: function (camera, element) {

                controls = new OrbitControls(camera, element);
                controls.maxPolarAngle = Math.PI / 2.2;
                controls.minPolarAngle = Math.PI / 3;
                controls.minDistance = 400;
                controls.maxDistance = 600;
                controls.noPan = true;
                return controls;
            },
            isEnabled: function (enabled) {
                controls.enabled = enabled;
            }
        }
    });
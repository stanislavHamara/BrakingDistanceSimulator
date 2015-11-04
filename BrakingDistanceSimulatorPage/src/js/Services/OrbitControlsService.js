angular.module('OrbitControlsService',[])
    .factory('OrbitControlsService', function(){

        var OrbitControls = require('three-orbit-controls')(THREE);

        var controls;

        return {
            getControls: function(camera, element){
                controls = new OrbitControls(camera, element);
                controls.maxPolarAngle = Math.PI/2;
                controls.minPolarAngle = 1/3 * Math.PI;
                controls.minDistance = 300;
                controls.maxDistance = 1000;
                controls.noPan = true;

                return controls
            }
        }
    });
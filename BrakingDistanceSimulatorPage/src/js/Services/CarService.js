angular.module('CarService', [])
    .factory('CarService', function () {
        var car;

        function loadCar(scene, camera) {
            car = new THREE.Car();
            car.modelScale = 0.1;
            car.backWheelOffset = 60;
            car.loadPartsJSON("dist/js/models/body.js", "dist/js/models/wheel.js");
            car.callback = function (object) {
                addCar(object, 0, 0, 0, scene, camera);
            }
        }

        function addCar(object, x, y, z, scene, camera){

            object.root.position.set( x, y, z );
            object.enableShadows(true);

            camera.target = object;

            scene.add( object.root );
            console.log(object);
        }

        return {
            getCar: function (scene, camera) {
                loadCar(scene, camera);
            }
        }
    });
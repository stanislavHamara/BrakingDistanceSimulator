angular.module('CarService',['OrbitControlsService'])
    .factory('CarService', ['OrbitControlsService', function(OrbitControlsService){
        var car;
        var carCamera;
        carCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000000);
        carCamera.position.x = 470;
        carCamera.position.y = 100;

        var oControls = OrbitControlsService.getControls(carCamera, document.getElementById('bds-threejs-container'));

        var controlsCar = {

            moveForward: false,
            moveBackward: false,
            moveLeft: false,
            moveRight: false

        };

        var clock = new THREE.Clock();

        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);

        function loadCar(scene) {
            car = new THREE.Car();
            car.modelScale = 0.1;
            car.backWheelOffset = 60;
            car.loadPartsJSON("dist/js/models/body.js", "dist/js/models/wheel.js");
            car.callback = function (object) {
                addCar(object, 0, 0, 0, scene);
            }
        }

        function addCar(object, x, y, z, scene ) {

            object.root.position.set(x, y, z);
            object.enableShadows(true);
            oControls.target = object.root.position;

            scene.add(object.root);
            console.log(object);

            animate();
            render();
        }

        function onKeyDown(event) {

            switch (event.keyCode) {

                case 38: /*up*/
                    controlsCar.moveForward = true;
                    break;
                case 87: /*W*/
                    controlsCar.moveForward = true;
                    break;

                case 40: /*down*/
                    controlsCar.moveBackward = true;
                    break;
                case 83: /*S*/
                    controlsCar.moveBackward = true;
                    break;

                case 37: /*left*/
                    controlsCar.moveLeft = true;
                    break;
                case 65: /*A*/
                    controlsCar.moveLeft = true;
                    break;

                case 39: /*right*/
                    controlsCar.moveRight = true;
                    break;
                case 68: /*D*/
                    controlsCar.moveRight = true;
                    break;
            }

        }

        function onKeyUp(event) {

            switch (event.keyCode) {

                case 38: /*up*/
                    controlsCar.moveForward = false;
                    break;
                case 87: /*W*/
                    controlsCar.moveForward = false;
                    break;

                case 40: /*down*/
                    controlsCar.moveBackward = false;
                    break;
                case 83: /*S*/
                    controlsCar.moveBackward = false;
                    break;

                case 37: /*left*/
                    controlsCar.moveLeft = false;
                    break;
                case 65: /*A*/
                    controlsCar.moveLeft = false;
                    break;

                case 39: /*right*/
                    controlsCar.moveRight = false;
                    break;
                case 68: /*D*/
                    controlsCar.moveRight = false;
                    break;
            }

        }

        function animate() {

            requestAnimationFrame(animate);
            render();

        }

        function render() {
            var delta = clock.getDelta();
            car.updateCarModel( delta, controlsCar);
            carCamera.lookAt(car.root.position);
        }


        return {
            getCar: function (scene) {
                loadCar(scene);
            },
            getCarCamera: function (){
                console.log(carCamera);
                return carCamera;
            },
            getEnvControls: function(){
                return oControls;
            }
        }
    }]);
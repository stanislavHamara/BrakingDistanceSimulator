angular.module('CarService', [ 'PhysicsService', 'CameraService'])
    .factory('CarService', ['PhysicsService', 'CameraService',
        function (PhysicsService, CameraService) {
            var car;
            var oControls;

            var controlsCar = {
                moveForward: false,
                moveBackward: false,
                moveLeft: false,
                moveRight: false
            };

            var carPhysics = PhysicsService.getPhysicsData();
            console.log(carPhysics);

            var directionalLight = new THREE.DirectionalLight(0xffffff);
            directionalLight.position.set(200, 500, 200);
            directionalLight.castShadow = true;
            directionalLight.shadowMapWidth = 2048;
            directionalLight.shadowMapHeight = 2048;

            var d = 1024;

            directionalLight.shadowCameraTop = d;
            directionalLight.shadowCameraBottom = -d;
            directionalLight.shadowCameraLeft = -d;
            directionalLight.shadowCameraRight = d;

            var clock = new THREE.Clock();
            var decelerate = false;

            document.addEventListener('keydown', onKeyDown, false);
            document.addEventListener('keyup', onKeyUp, false);

            function loadCar(scene, reflection, controls) {
                car = new THREE.Car();
                car.modelScale = 0.1;
                car.backWheelOffset = 60;
                car.FRONT_ACCELERATION = 500;
                car.MAX_SPEED = 6000; // equivalent to 60 kmph => 1kmph = 100 units
                car.loadPartsJSON("dist/js/models/body.js", "dist/js/models/wheel.js");
                car.callback = function (object) {
                    oControls = controls;
                    addCar(object, 0, 0, 0, scene);
                    addTextures(object, reflection);
                    CameraService.setTarget(object);
                };
            }

            function addCar(object, x, y, z, scene) {

                object.root.position.set(x, y, z);
                object.enableShadows(true);
                oControls.target = object.root.position;

                scene.add(object.root);

                animate();
                render();
            }

            function addTextures(object, reflection) {
                //body
                object.bodyMaterials[1] = new THREE.MeshLambertMaterial({
                    color: 0x000033,
                    envMap: reflection,
                    combine: THREE.MixOperation,
                    reflectivity: 0.2
                });
                //carbon
                object.bodyMaterials[2] = new THREE.MeshLambertMaterial({
                    color: 0xffffff,
                    envMap: reflection,
                    combine: THREE.MixOperation,
                    reflectivity: 0.3
                });
                //mirror
                object.bodyMaterials[4] = new THREE.MeshLambertMaterial({
                    color: 0xffffff,
                    envMap: reflection,
                    combine: THREE.MixOperation,
                    reflectivity: 1
                });
                //windows
                object.bodyMaterials[5] = new THREE.MeshLambertMaterial({
                    color: 0x111111,
                    envMap: reflection,
                    combine: THREE.MixOperation,
                    reflectivity: 0.6
                });
                //backlight
                object.bodyMaterials[6] = new THREE.MeshLambertMaterial({
                    color: 0x440000,
                    envMap: reflection,
                    combine: THREE.MixOperation,
                    reflectivity: 0.1
                });

                object.wheelMaterials[1] = new THREE.MeshLambertMaterial({
                    color: 0xffffff,
                    envMap: reflection,
                    combine: THREE.MixOperation,
                    reflectivity: 0.7
                });

                object.wheelMaterials[3] = object.wheelMaterials[2] = object.wheelMaterials[1];
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

                if (car.speed === car.MAX_SPEED) {
                    controlsCar.moveForward = false;
                    controlsCar.moveBackward = true;
                    decelerate = true;
                    //stop the wheels
                    car.wheelsLocked = true;
                }

                if (car.speed < 0 && decelerate) {
                    //calculate and set deceleration
                    controlsCar.moveBackward = false;
                    car.speed = 0;
                    decelerate = false;
                    car.wheelsLocked = false;
                }

                directionalLight.target = car.root;
                directionalLight.position.x = car.root.position.x + 200;
                directionalLight.position.z = car.root.position.z + 200;

            }

            function render() {
                var delta = clock.getDelta();
                car.updateCarModel(delta, controlsCar);
            }
            return {
                getCar: function (scene, reflection, controls) {
                    loadCar(scene, reflection, controls);
                },
                getCarLight: function() {
                    return directionalLight;
                },
                startSimulation: function () {
                    var maxSpeed = carPhysics.userInput.speed;
                    controlsCar.moveForward = true;
                    car.MAX_SPEED = carPhysics.userInput.imperial ? (maxSpeed * 62.5) : (maxSpeed * 100);
                }
            }
        }]);
angular.module('CarService', ['PhysicsService', 'CameraService'])
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

            var modal;

            var carPhysics = PhysicsService.getPhysicsData();

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
            var simulate = false;
            var thinkingTime = 670; //http://www.brake.org.uk/rsw/15-facts-a-resources/facts/1255-speed

            document.addEventListener('keydown', onKeyDown, false);
            document.addEventListener('keyup', onKeyUp, false);

            function loadCar(scene, reflection, controls) {
                car = new THREE.Car();
                car.modelScale = 0.1;
                car.backWheelOffset = 60;
                car.FRONT_ACCELERATION = 500; //equivalent to 9.4 m/s^2
                car.MAX_SPEED = 6000; // 62.5 = 1mph
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

            function animate() {
                requestAnimationFrame(animate);
                render();

                //start simulation
                if (car.speed === car.MAX_SPEED && simulate) {
                    decelerate = true;
                    simulate = false;

                    //reaction distance
                    setTimeout(function () {
                        controlsCar.moveForward = false;
                        controlsCar.moveBackward = true;
                        //start braking
                        car.wheelsLocked = true;
                    }, thinkingTime);
                }

                //once car stopped restart its properties
                if (car.speed < 0 && decelerate) {
                    controlsCar.moveBackward = false;
                    car.speed = 0;
                    decelerate = false;
                    car.wheelsLocked = false;

                    if (modal) {
                        setTimeout(function () {
                            modal.style.visibility = "visible";
                        }, 1000);

                    }
                }

                directionalLight.target = car.root;
                directionalLight.position.x = car.root.position.x + 200;
                directionalLight.position.z = car.root.position.z + 200;
            }

            function render() {
                var delta = clock.getDelta();
                car.updateCarModel(delta, controlsCar);
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

            return {
                getCar: function (scene, reflection, controls) {
                    loadCar(scene, reflection, controls);
                },
                getCarLight: function () {
                    return directionalLight;
                },
                startSimulation: function () {
                    modal = document.getElementById("resultModal");
                    modal.style.visibility = "hidden";

                    //restart car's position
                    car.root.position.x = 0;
                    car.root.position.y = 0;
                    car.root.position.z = 0;

                    var maxSpeed = carPhysics.userInput.speed;
                    simulate = true;
                    controlsCar.moveForward = true;
                    car.MAX_SPEED = carPhysics.userInput.imperial ? (maxSpeed * 62.5) : (maxSpeed / 1.6 * 62.5);
                    car.BACK_ACCELERATION = PhysicsService.getDeceleration();
                }
            }
        }]);
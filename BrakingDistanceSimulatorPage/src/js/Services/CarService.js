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
            var drivingEnabled = false;
            var carPhysics = PhysicsService.getPhysicsData();

            var directionalLight = new THREE.DirectionalLight(0xffffff);
            directionalLight.position.set(0, 500, 0);
            directionalLight.castShadow = true;
            directionalLight.shadow.mapSize.width = 2048;
            directionalLight.shadow.mapSize.height = 2048;

            directionalLight.shadow.camera.top = 200;
            directionalLight.shadow.camera.bottom = -1024;
            directionalLight.shadow.camera.left = -1500;
            directionalLight.shadow.camera.right = 1500;

            directionalLight.shadow.camera.near = 0;
            directionalLight.shadow.camera.far = 650;

            var clock = new THREE.Clock();

            var decelerate = false;
            var simulate = false;
            var thinkingTime = 670; //http://www.brake.org.uk/rsw/15-facts-a-resources/facts/1255-speed
            var tiltBack = false;

            document.addEventListener('keydown', onKeyDown, false);
            document.addEventListener('keyup', onKeyUp, false);

            function loadCar(scene, reflection, controls) {
                car = new THREE.Car();
                car.modelScale = 0.1;
                car.backWheelOffset = 60;
                car.FRONT_ACCELERATION = 500; //equivalent to 9.4 m/s^2
                car.MAX_SPEED = 3000; // 62.5 = 1mph
                car.loadPartsJSON("dist/js/models/body-min.js", "dist/js/models/wheel.js");
                car.callback = function (car) {
                    oControls = controls;
                    addCar(car, 0, 0, 0, scene);
                    addTextures(car, reflection);
                    CameraService.setTarget(car);
                };
            }

            function addCar(car, x, y, z, scene) {

                car.root.position.set(x, y, z);
                car.enableShadows(true);
                oControls.target = car.root.position;

                scene.add(car.root);

                animate();
                render();
            }

            function addTextures(car, reflection) {
                //body
                car.bodyMaterials[1] = new THREE.MeshLambertMaterial({
                    color: 0x000033,
                    envMap: reflection,
                    combine: THREE.MixOperation,
                    reflectivity: 0.2
                });
                //carbon
                car.bodyMaterials[2] = new THREE.MeshLambertMaterial({
                    color: 0xffffff,
                    envMap: reflection,
                    combine: THREE.MixOperation,
                    reflectivity: 0.3
                });
                //mirror
                car.bodyMaterials[4] = new THREE.MeshLambertMaterial({
                    color: 0xffffff,
                    envMap: reflection,
                    combine: THREE.MixOperation,
                    reflectivity: 1
                });
                //windows
                car.bodyMaterials[5] = new THREE.MeshLambertMaterial({
                    color: 0x111111,
                    envMap: reflection,
                    combine: THREE.MixOperation,
                    reflectivity: 0.6
                });
                //backlight
                car.bodyMaterials[6] = new THREE.MeshLambertMaterial({
                    color: 0x440000,
                    envMap: reflection,
                    combine: THREE.MixOperation,
                    reflectivity: 0.1
                });

                car.wheelMaterials[1] = new THREE.MeshLambertMaterial({
                    color: 0xffffff,
                    envMap: reflection,
                    combine: THREE.MixOperation,
                    reflectivity: 0.7
                });

                car.wheelMaterials[3] = car.wheelMaterials[2] = car.wheelMaterials[1];
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
                    tiltBack = true;

                    if (modal) {
                        setTimeout(function () {
                            modal.style.visibility = "visible";
                        }, 700);
                    }
                }

                if(tiltBack && car.acceleration < 0){
                    if(car.acceleration + 0.2 > 0){
                        car.acceleration = 0;
                        tiltBack = false;
                    } else {
                        car.acceleration += 0.2;
                    }
                }

                directionalLight.target = car.root;
                directionalLight.position.x = car.root.position.x - 200;
                directionalLight.position.z = car.root.position.z + 75;
            }

            function render() {
                var delta = clock.getDelta();
                car.updateCarModel(delta, controlsCar);
            }

            function onKeyDown(event) {
                if (drivingEnabled)
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
                if (drivingEnabled)
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
                updateDriving: function () {
                    drivingEnabled = CameraService.getDriving();
                },
                startSimulation: function () {
                    modal = document.getElementById("resultModal");
                    modal.style.visibility = "hidden";

                    //restart car's position
                    car.root.position.x = 0;
                    car.root.position.y = 0;
                    car.root.position.z = 0;
                    
                    //restart car's orientation
                    car.carOrientation = 0;
                    car.wheelOrientation = 0;

                    var maxSpeed = carPhysics.userInput.speed;
                    simulate = true;
                    controlsCar.moveForward = true;
                    car.MAX_SPEED = carPhysics.userInput.imperial ? (maxSpeed * 62.5) : (maxSpeed / 1.6 * 62.5);
                    car.BACK_ACCELERATION = PhysicsService.getDeceleration();
                }
            }
        }]);
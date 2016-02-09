angular.module('CarService', ['OrbitControlsService', 'PropertiesService', 'CameraService'])
    .factory('CarService', ['OrbitControlsService', 'PropertiesService', 'CameraService',
        function (OrbitControlsService, PropertiesService, CameraService) {
            var car;
            var carCamera =  CameraService.getCamera();
            var carCamera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000000);;

            var oControls = OrbitControlsService.getControls(carCamera, document.getElementById('bds-threejs-container'));

            var carLight = new THREE.DirectionalLight(0xffffff);
            carLight.position.set(300, 1000, 300);
            carLight.castShadow = true;
            carLight.shadowMapWidth = 2048;
            carLight.shadowMapHeight = 2048;

            console.log(carLight);

            var controlsCar = {
                moveForward: false,
                moveBackward: false,
                moveLeft: false,
                moveRight: false

            };

            var clock = new THREE.Clock();
            var decelerate = false;

            document.addEventListener('keydown', onKeyDown, false);
            document.addEventListener('keyup', onKeyUp, false);

            function loadCar(scene, reflection) {
                car = new THREE.Car();
                car.modelScale = 0.1;
                car.backWheelOffset = 60;
                car.FRONT_ACCELERATION = 500;
                car.MAX_SPEED = 6000; // equivalent to 60 kmph => 1kmph = 100 units
                car.loadPartsJSON("dist/js/models/body.js", "dist/js/models/wheel.js");
                car.callback = function (object) {
                    addCar(object, 0, 0, 0, scene);
                    addTextures(object, reflection);
                    carLight.target = object.root;
                }
            }

            function addCar(object, x, y, z, scene) {

                object.root.position.set(x, y, z);
                object.enableShadows(true);
                oControls.target = object.root.position;

                carCamera2.position.x = object.root.position.x + 200;
                carCamera2.position.z = object.root.position.z;

                carCamera2.position.y = 100;

                scene.add(object.root);

                animate();
                render();
            }

            function addTextures(object, reflection) {
                console.log(object.wheelMaterials);
                //body
                object.bodyMaterials[1] = new THREE.MeshLambertMaterial({
                    color: 0x000033,
                    envMap: reflection,
                    combine: THREE.MixOperation,
                    reflectivity: 0.4
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

            }

            function render() {
                var delta = clock.getDelta();
                car.updateCarModel(delta, controlsCar);
                carCamera.lookAt(car.root.position);

                carCamera2.position.x = car.root.position.x + 500;
                carCamera2.position.z = car.root.position.z;
                carCamera2.lookAt(car.root.position);
            }


            return {
                getCar: function (scene, reflection) {
                    loadCar(scene, reflection);
                },
                getCarCamera: function () {
                    return carCamera;
                    //return carCamera2;
                },
                getEnvControls: function () {
                    return oControls;
                },
                getCarLight: function () {
                    return carLight;
                },
                startSimulation: function () {
                    var maxSpeed = PropertiesService.getSpeed();
                    controlsCar.moveForward = true;
                    //controlsCar.moveLeft = true;
                    car.MAX_SPEED = PropertiesService.getUnits() ? (maxSpeed * 62.5) : (maxSpeed * 100);
                }
            }
        }]);
angular.module('Scene', ['rt.resize', 'OrbitControlsService', 'StatsService', 'CarService', 'CameraService', 'PropertiesService'])
    .controller('SceneController', ['$scope', 'resize', 'OrbitControlsService', 'StatsService', 'CarService', 'CameraService', 'PropertiesService',
        function ($scope, resize, OrbitControlsService, StatsService, CarService, CameraService, PropertiesService) {

            $scope.element = document.getElementById('bds-threejs-container');
            THREE.Cache.enabled = true;

            var scene, sceneCube, renderer, controls;
            var plane, planeMaterial, planeMesh;
            var directionalLight;
            var asphaltT, gravelT, sandT, iceT, snowT;
            var reflectionCube;
            var skyMesh;

            $scope.initScene = function () {

                controls = OrbitControlsService.getControls(CameraService.getCamera(), document.getElementById('bds-threejs-container'));

                scene = new THREE.Scene();
                loadGroundTextures();
                createLights();
                createPoles();

                renderer = new THREE.WebGLRenderer({antialias: true});
                renderer.setSize($scope.element.offsetWidth, $scope.element.offsetHeight);
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                renderer.autoClear = false;

                $scope.element.appendChild(renderer.domElement);

                //add Stats
                $scope.element.appendChild(StatsService.getStats().domElement);

                //reflection for a car
                sceneCube = new THREE.Scene();
                createEnvironment();

                //load the car
                CarService.getCar(scene, reflectionCube, controls);

            };

            $scope.animate = function () {
                // note: three.js includes requestAnimationFrame shim
                requestAnimationFrame($scope.animate);
                $scope.render();
            };

            $scope.render = function () {
                CameraService.updateCamera();
                CarService.updateDriving();
                updateGround();
                directionalLight = CarService.getCarLight();
                renderer.render(sceneCube, CameraService.getCubeCamera());
                renderer.render(scene, CameraService.getCamera());
            };

            resize($scope).call(function () {

                CameraService.getCamera().aspect = $scope.element.offsetWidth / $scope.element.offsetHeight;
                CameraService.getCamera().updateProjectionMatrix();

                CameraService.getCubeCamera().aspect = $scope.element.offsetWidth / $scope.element.offsetHeight;
                CameraService.getCubeCamera().updateProjectionMatrix();

                renderer.setSize($scope.element.offsetWidth, $scope.element.offsetHeight);
            });

            $scope.initScene();
            $scope.animate();
            $scope.render();

            function createLights() {

                directionalLight = CarService.getCarLight();
                scene.add(directionalLight);

                //scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));

                var envLight = new THREE.AmbientLight(0x404040);
                envLight.position.set(0, 1000, 0);
                scene.add(envLight);
            }

            function createPoles() {
                var poleGeometry;
                var poleMaterial = new THREE.MeshLambertMaterial({color: 0xbbbbbb});
                var pole;
                var poleCount = 290;

                for (var i = -1; i < poleCount; i++) {
                    var randomHeight = Math.random() * (800 - 100) + 100;
                    poleGeometry = new THREE.BoxGeometry(40, randomHeight, 40);
                    pole = new THREE.Mesh(poleGeometry, poleMaterial);
                    pole.position.x = -200;
                    pole.position.z = 500 * i;
                    pole.receiveShadow = true;
                    pole.castShadow = true;
                    scene.add(pole);
                }
            }

            function createGroundPlane() {
                plane = new THREE.PlaneGeometry(40000, 150000);
                planeMaterial = new THREE.MeshLambertMaterial({map: asphaltT});
                planeMesh = new THREE.Mesh(plane, planeMaterial);
                planeMesh.rotation.x -= Math.PI / 2;
                planeMesh.position.z = 70000;
                planeMesh.receiveShadow = true;
                planeMesh.castShadow = true;

                scene.add(planeMesh);
            }

            function loadGroundTextures() {
                var loader = new THREE.TextureLoader();
                loader.load(
                    "dist/textures/asphalt.jpg",
                    function (texture) {
                        texture.wrapS = THREE.RepeatWrapping;
                        texture.wrapT = THREE.RepeatWrapping;
                        texture.repeat.set(100, 375);
                        asphaltT = texture;
                        createGroundPlane();
                    }
                );

                loader.load(
                    "dist/textures/gravel.jpg",
                    function (texture) {
                        texture.wrapS = THREE.RepeatWrapping;
                        texture.wrapT = THREE.RepeatWrapping;
                        texture.repeat.set(200, 750);
                        gravelT = texture;
                    }
                );

                loader.load(
                    "dist/textures/sand.jpg",
                    function (texture) {
                        texture.wrapS = THREE.RepeatWrapping;
                        texture.wrapT = THREE.RepeatWrapping;
                        texture.repeat.set(200, 750);
                        sandT = texture;
                    }
                );

                loader.load(
                    "dist/textures/ice.jpg",
                    function (texture) {
                        texture.wrapS = THREE.RepeatWrapping;
                        texture.wrapT = THREE.RepeatWrapping;
                        texture.repeat.set(200, 750);
                        iceT = texture;
                    }
                );

                loader.load(
                    "dist/textures/snow.jpg",
                    function (texture) {
                        texture.wrapS = THREE.RepeatWrapping;
                        texture.wrapT = THREE.RepeatWrapping;
                        texture.repeat.set(200, 375);
                        snowT = texture;
                    }
                );
            }

            function updateGround() {
                var currentTexture = PropertiesService.getSelectedSurface();
                if (planeMesh) {
                    switch (currentTexture) {
                        case 'Asphalt':
                            planeMesh.material.map = asphaltT;
                            break;
                        case 'Gravel':
                            planeMesh.material.map = gravelT;
                            break;
                        case 'Sand':
                            planeMesh.material.map = sandT;
                            break;
                        case 'Snow':
                            planeMesh.material.map = snowT;
                            break;
                        case 'Ice':
                            planeMesh.material.map = iceT;
                            break;
                    }

                    planeMesh.material.needsUpdate = true;
                    //TODO: change the environment too, to change the car reflection
                }
            }

            function createEnvironment() {
                var path = "dist/textures/";
                var format = ".png";
                var urls = [
                    path + 'pxa' + format, path + 'nxa' + format,
                    path + 'py' + format, path + 'nya' + format,
                    path + 'pza' + format, path + 'nza' + format
                ];

                var cubeLoader = new THREE.CubeTextureLoader();
                reflectionCube = cubeLoader.load(urls);
                reflectionCube.format = THREE.RGBFormat;

                //Skybox
                var shader = THREE.ShaderLib['cube'];
                shader.uniforms["tCube"].value = reflectionCube;

                var shaderMaterial = new THREE.ShaderMaterial({
                    fragmentShader: shader.fragmentShader,
                    vertexShader: shader.vertexShader,
                    uniforms: shader.uniforms,
                    depthWrite: false,
                    side: THREE.BackSide
                });

                skyMesh = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), shaderMaterial);
                sceneCube.add(skyMesh);
            }
        }]);

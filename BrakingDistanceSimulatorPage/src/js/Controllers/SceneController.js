angular.module('Scene', ['rt.resize', 'OrbitControlsService', 'StatsService', 'CarService', 'CameraService'])
    .controller('SceneController', ['$scope', 'resize', 'OrbitControlsService', 'StatsService', 'CarService', 'CameraService',
        function ($scope, resize, OrbitControlsService, StatsService, CarService, CameraService) {

            $scope.element = document.getElementById('bds-threejs-container');

            var scene, sceneCube, renderer, controls;
            var plane, planeMaterial, planeMesh;
            var directionalLight;

            $scope.initScene = function () {

                controls = OrbitControlsService.getControls(CameraService.getCamera(), document.getElementById('bds-threejs-container'));

                scene = new THREE.Scene();
                createGroundPlane();
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

                var path = "dist/textures/";
                var format = ".png";
                var urls = [
                    path + 'px' + format, path + 'nx' + format,
                    path + 'py' + format, path + 'ny' + format,
                    path + 'pz' + format, path + 'nz' + format
                ];

                var reflectionCube = THREE.ImageUtils.loadTextureCube(urls);
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

                var skyMesh = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), shaderMaterial);
                sceneCube.add(skyMesh);

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

                var envLight = new THREE.AmbientLight(0x404040);
                envLight.position.set(0, 1000, 0);

                scene.add(envLight);
            }

            function createGroundPlane() {

                var texture = THREE.ImageUtils.loadTexture("dist/textures/asphalt.jpg");
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(400, 400);

                plane = new THREE.PlaneGeometry(40000, 40000);
                planeMaterial = new THREE.MeshLambertMaterial({map: texture});
                planeMesh = new THREE.Mesh(plane, planeMaterial);
                planeMesh.rotation.x -= Math.PI / 2;
                planeMesh.receiveShadow = true;
                planeMesh.castShadow = true;

                scene.add(planeMesh);
            }

            function createPoles() {
                var poleGeometry;
                var poleMaterial = new THREE.MeshLambertMaterial({color: 0xbbbbbb});
                var pole;


                for (var i = -2; i < 25; i++) {
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

        }]);

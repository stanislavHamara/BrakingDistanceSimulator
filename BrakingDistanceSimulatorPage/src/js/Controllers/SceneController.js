angular.module('Scene', ['rt.resize', 'OrbitControlsService', 'StatsService', 'CarService'])
    .controller('SceneController', ['$scope', 'resize', 'OrbitControlsService', 'StatsService', 'CarService',
        function ($scope, resize, OrbitControlsService, StatsService, CarService) {

            $scope.element = document.getElementById('bds-threejs-container');

            var camera, cameraCube, scene, sceneCube, renderer, controls;
            var plane, planeMaterial, planeMesh;
            var directionalLight, sky, envLight;

            $scope.initScene = function () {

                camera = CarService.getCarCamera();
                controls = CarService.getEnvControls();
                directionalLight = CarService.getCarLight();
                envLight = new THREE.DirectionalLight(0xffffff);
                envLight.position.set(0, 1000, 0);

                scene = new THREE.Scene();

                plane = new THREE.PlaneGeometry(40000, 40000);
                planeMaterial = new THREE.MeshLambertMaterial({color: 0x111111});
                planeMesh = new THREE.Mesh(plane, planeMaterial);
                planeMesh.rotation.x -= Math.PI / 2;
                planeMesh.receiveShadow = true;
                planeMesh.castShadow = true;
                console.log(planeMesh);



                scene.add(planeMesh);
                scene.add(directionalLight);
                scene.add(envLight);

                renderer = new THREE.WebGLRenderer({antialias: true});
                renderer.setSize($scope.element.offsetWidth, $scope.element.offsetHeight);
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.BasicShadowMap;
                renderer.autoClear = false;

                $scope.element.appendChild(renderer.domElement);

                //add Stats
                $scope.element.appendChild(StatsService.getStats().domElement);

                //reflection for a car
                cameraCube = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000000);
                sceneCube = new THREE.Scene();

                var path = "dist/textures/";
                var format = ".jpg";
                var urls = [
                    path + 'px' + format, path + 'nx' + format,
                    path + 'py' + format, path + 'ny' + format,
                    path + 'pz' + format, path + 'nz' + format
                ];

                var reflectionCube = THREE.ImageUtils.loadTextureCube(urls);
                reflectionCube.format = THREE.RGBFormat;

                var refractionCube = new THREE.ImageUtils.loadTextureCube(urls);
                refractionCube.mapping = THREE.CubeRefractionMapping;
                refractionCube.format = THREE.RGBFormat;

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
                CarService.getCar(scene, reflectionCube);

            };

            $scope.animate = function () {

                // note: three.js includes requestAnimationFrame shim
                requestAnimationFrame($scope.animate);
                $scope.render();

            };

            $scope.render = function () {

                cameraCube.rotation.copy(camera.rotation);
                renderer.render(sceneCube, cameraCube);
                renderer.render(scene, camera);
            };

            resize($scope).call(function () {

                camera.aspect = $scope.element.offsetWidth / $scope.element.offsetHeight;
                camera.updateProjectionMatrix();

                cameraCube.aspect = $scope.element.offsetWidth / $scope.element.offsetHeight;
                cameraCube.updateProjectionMatrix();

                renderer.setSize($scope.element.offsetWidth, $scope.element.offsetHeight);
            });

            $scope.initScene();
            $scope.animate();
            $scope.render();

        }]);

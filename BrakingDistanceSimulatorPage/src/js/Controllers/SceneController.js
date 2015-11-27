angular.module('Scene', ['rt.resize', 'OrbitControlsService', 'StatsService', 'CarService'])
    .controller('SceneController', ['$scope', 'resize', 'OrbitControlsService', 'StatsService', 'CarService',
        function ($scope, resize, OrbitControlsService, StatsService, CarService) {

            $scope.element = document.getElementById('bds-threejs-container');

            var camera, scene, renderer, controls;
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
                var texture = THREE.ImageUtils.loadTexture("dist/js/models/asphalt.jpg");
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(300, 300);
                planeMaterial = new THREE.MeshLambertMaterial({map: texture});
                planeMesh = new THREE.Mesh(plane, planeMaterial);
                planeMesh.rotation.x -= Math.PI / 2;
                planeMesh.position.y += 2;
                planeMesh.receiveShadow = true;
                planeMesh.castShadow = true;
                console.log(planeMesh);

                sky = new THREE.Sky();
                sky.uniforms.sunPosition.value = new THREE.Vector3(0, 5000, 10000);
                scene.add(sky.mesh);

                scene.add(planeMesh);
                scene.add(directionalLight);
                scene.add(envLight);

                renderer = new THREE.WebGLRenderer({antialias: true});
                renderer.setSize($scope.element.offsetWidth, $scope.element.offsetHeight);
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.BasicShadowMap;

                $scope.element.appendChild(renderer.domElement);

                //add Stats
                $scope.element.appendChild(StatsService.getStats().domElement);

                //load the car
                CarService.getCar(scene);
            };

            $scope.animate = function () {

                // note: three.js includes requestAnimationFrame shim
                requestAnimationFrame($scope.animate);
                renderer.render(scene, camera);
            };

            resize($scope).call(function () {

                camera.aspect = $scope.element.offsetWidth / $scope.element.offsetHeight;
                camera.updateProjectionMatrix();

                renderer.setSize($scope.element.offsetWidth, $scope.element.offsetHeight);
            });

            $scope.initScene();
            $scope.animate();
        }]);

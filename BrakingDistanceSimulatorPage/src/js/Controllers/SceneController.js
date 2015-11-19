angular.module('Scene', ['rt.resize', 'OrbitControlsService'])
    .controller('SceneController', ['$scope', 'resize', 'OrbitControlsService',
        function ($scope, resize, OrbitControlsService) {

            $scope.element = document.getElementById('bds-threejs-container');
            $scope.zmesh;

            var camera, scene, renderer, controls;
            var boxGeometry, boxMaterial, boxMesh;
            var plane, planeMaterial, planeMesh;
            var directionalLight;
            var zmesh;

            var initStats = function () {
                var stats = new Stats();
                stats.setMode(0); // 0: fps, 1: ms, 2: mb

                stats.domElement.style.position = 'absolute';
                stats.domElement.style.left = '0px';
                stats.domElement.style.top = '0px';

                $scope.element.appendChild(stats.domElement);

                var update = function () {

                    stats.begin();
                    stats.end();
                    requestAnimationFrame(update);

                };

                requestAnimationFrame(update);
            };

            var loadObject = function () {
                var loader = new THREE.JSONLoader();

                var createMesh = function (geometry) {
                    var zmesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
                        color: 0x00ff00,
                        side: THREE.DoubleSide
                    }));
                    zmesh.position.set(0, -220, -100);
                    zmesh.scale.set(50, 50, 50);
                    zmesh.overdraw = true;
                    zmesh.castShadow = true;
                    scene.add(zmesh);

                };

                loader.load("dist/js/models/mesh.js", createMesh);
            };

            $scope.initScene = function () {

                loadObject();

                camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
                camera.position.z = 500;

                scene = new THREE.Scene();

                controls = OrbitControlsService.getControls(camera, $scope.element, zmesh);

                boxMaterial = new THREE.MeshPhongMaterial({color: 0xff0000});
                boxGeometry = new THREE.BoxGeometry(200, 200, 200);
                boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
                boxMesh.castShadow = true;

                plane = new THREE.PlaneGeometry(4000, 4000);
                planeMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide});
                planeMesh = new THREE.Mesh(plane, planeMaterial);
                planeMesh.rotation.x -= Math.PI / 2;
                planeMesh.position.y -= 220;
                planeMesh.receiveShadow = true;

                directionalLight = new THREE.DirectionalLight(0xffffff);
                directionalLight.position.set(200, 1000, 0);
                directionalLight.target = boxMesh;
                directionalLight.castShadow = true;
                directionalLight.shadowCameraVisible = true;

                //scene.add(boxMesh);
                scene.add(planeMesh);
                scene.add(directionalLight);

                renderer = new THREE.WebGLRenderer({antialias: true});
                renderer.setSize($scope.element.offsetWidth, $scope.element.offsetHeight);
                renderer.shadowMapEnabled = true;
                renderer.shadowMapType = THREE.PCFSoftShadowMap;

                $scope.element.appendChild(renderer.domElement);

                initStats();


            };

            $scope.animate = function () {

                // note: three.js includes requestAnimationFrame shim
                requestAnimationFrame($scope.animate);

                boxMesh.rotation.x += 0.01;
                boxMesh.rotation.y += 0.02;

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

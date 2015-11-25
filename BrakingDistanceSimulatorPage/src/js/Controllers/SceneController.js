angular.module('Scene', ['rt.resize', 'OrbitControlsService', 'StatsService'])
    .controller('SceneController', ['$scope', 'resize', 'OrbitControlsService', 'StatsService',
        function ($scope, resize, OrbitControlsService, StatsService) {

            $scope.element = document.getElementById('bds-threejs-container');
            $scope.zmesh;

            var camera, scene, renderer, controls;
            var plane, planeMaterial, planeMesh;
            var directionalLight, sky;
            var zmesh;


            function JSONLoad() {
                var loader = new THREE.JSONLoader();

                var createMesh = function (geometry, materials) {
                    console.log(materials);
                    var zmesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
                    zmesh.position.set(0, -220, -100);
                    zmesh.scale.set(0.1, 0.1, 0.1);
                    zmesh.overdraw = true;
                    zmesh.castShadow = true;
                    zmesh.traverse( function( node ) {
                        if( node.material ) {
                            node.material.side = THREE.DoubleSide;
                        }
                    });
                    for(var i = 0; i < materials.length; i++){
                        materials[i].side = THREE.DoubleSide;
                    }
                    scene.add(zmesh);

                };

                loader.load("dist/js/models/mesh.js", createMesh);
            }

            $scope.initScene = function () {

                JSONLoad();

                camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000000);
                camera.position.z = 500;

                scene = new THREE.Scene();

                controls = OrbitControlsService.getControls(camera, $scope.element, zmesh);

                plane = new THREE.PlaneGeometry(40000, 40000);
                planeMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide});
                planeMesh = new THREE.Mesh(plane, planeMaterial);
                planeMesh.rotation.x -= Math.PI / 2;
                planeMesh.position.y -= 220;
                planeMesh.receiveShadow = true;

                directionalLight = new THREE.DirectionalLight(0xffffff);
                directionalLight.position.set(-100, 500, -300);
                directionalLight.target = planeMesh;
                directionalLight.castShadow = true;
                directionalLight.shadowCameraVisible = true;
                directionalLight.shadowMapWidth = 2048;
                directionalLight.shadowMapHeight= 2048;

                sky = new THREE.Sky();
                sky.uniforms.sunPosition.value = new THREE.Vector3(0, 5000, -10000);
                scene.add(sky.mesh);

                scene.add(planeMesh);
                scene.add(directionalLight);

                renderer = new THREE.WebGLRenderer({antialias: true});
                renderer.setSize($scope.element.offsetWidth, $scope.element.offsetHeight);
                renderer.shadowMapEnabled = true;
                renderer.shadowMapType = THREE.PCFSoftShadowMap;

                $scope.element.appendChild(renderer.domElement);

                //add Stats
                $scope.element.appendChild(StatsService.getStats().domElement);

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

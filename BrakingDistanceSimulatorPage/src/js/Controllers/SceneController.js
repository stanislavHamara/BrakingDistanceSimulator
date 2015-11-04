angular.module('Scene', ['rt.resize'])
    .controller('SceneController', ['$scope', 'resize', function ($scope, resize) {

        var OrbitControls = require('three-orbit-controls')(THREE);

        $scope.element = document.getElementById('bds-threejs-container');

        var camera, scene, renderer, controls;
        var boxGeometry, boxMaterial, boxMesh;
        var plane, planeMaterial, planeMesh;
        var directionalLight;

        $scope.initScene = function () {

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.z = 1000;

            scene = new THREE.Scene();

            controls = new OrbitControls(camera, $scope.element);
            controls.maxPolarAngle = Math.PI/2;
            controls.minPolarAngle = 1/3 * Math.PI;
            controls.minDistance = 300;
            controls.maxDistance = 2000;

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

            scene.add(boxMesh);
            scene.add(planeMesh);
            scene.add(directionalLight);

            renderer = new THREE.WebGLRenderer({antialias: true});
            renderer.setSize($scope.element.offsetWidth, $scope.element.offsetHeight);
            renderer.shadowMapEnabled = true;
            renderer.shadowMapType = THREE.PCFSoftShadowMap;

            $scope.element.appendChild(renderer.domElement);

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

angular.module('Scene', ['rt.resize'])
    .controller('SceneController', ['$scope', 'resize', function ($scope, resize) {

        var OrbitControls = require('three-orbit-controls')(THREE);

        $scope.element = document.getElementById('bds-threejs-container');

        var camera, scene, renderer, controls;
        var geometry, material, mesh;

        $scope.initScene = function () {

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.z = 1000;

            scene = new THREE.Scene();

            controls = new OrbitControls(camera);

            geometry = new THREE.BoxGeometry(200, 200, 200);
            material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            renderer = new THREE.WebGLRenderer();
            renderer.setSize($scope.element.offsetWidth, $scope.element.offsetHeight);

            $scope.element.appendChild(renderer.domElement);

        };

        $scope.animate = function () {

            // note: three.js includes requestAnimationFrame shim
            requestAnimationFrame($scope.animate);

            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.02;

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

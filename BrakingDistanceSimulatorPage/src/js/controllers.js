angular.module('simulator.controllers', [])
    .controller('PropertiesController', ['$scope', 'Properties', function ($scope, Properties) {

        $scope.surfaces = Properties.getSurfaces();
        $scope.weather = Properties.getWeather();
        $scope.units = 'km/h';
        $scope.speed = 60;

        $scope.speedButtons = [-1, -5, -10, +10, +5, +1];

        $scope.togglePreferences = {
            imperial: false,
            lookAround: true
        };

        $scope.setUnits = function () {
            $scope.units = $scope.togglePreferences.imperial ? 'mph' : 'km/h';
            $scope.speed = $scope.togglePreferences.imperial ? 40 : 60;
        };

        $scope.setSpeed = function (speed) {
            $scope.speed += speed;
        };

        $scope.setSurface = function (surfaceType) {
            Properties.setSelectedSurface(surfaceType);
            //console.log(Properties.getSelectedSurface());
        };

        $scope.checkSelectedSurface = function (surface) {
            return surface == Properties.getSelectedSurface();
        };

        $scope.setWeather = function (weather) {
            Properties.setSelectedWeather(weather);
            //console.log(Properties.getSelectedWeather());
        };

        $scope.checkSelectedWeather = function (weather) {
            return weather == Properties.getSelectedWeather();
        };

        $scope.startSimulation = function () {
            Properties.setSpeed($scope.speed, $scope.units);
            console.log(Properties.getSimulation());
            return Properties.getSimulation();
        }
    }])

    .controller('CanvasController',['$scope', function($scope){
        $scope.element = document.getElementById('bds-threejs-container');

        var camera, scene, renderer;
        var geometry, material, mesh;


        $scope.init = function() {

            camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
            camera.position.z = 1000;

            scene = new THREE.Scene();

            geometry = new THREE.BoxGeometry( 200, 200, 200 );
            material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true} );

            mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );

            renderer = new THREE.WebGLRenderer();
            renderer.setSize( $scope.element.offsetWidth, $scope.element.offsetHeight );

            $scope.element.appendChild( renderer.domElement );

        };

        $scope.animate = function() {

            // note: three.js includes requestAnimationFrame shim
            requestAnimationFrame( $scope.animate );

            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.02;

            renderer.render( scene, camera );
        };

        $scope.init();
        $scope.animate();

    }]);

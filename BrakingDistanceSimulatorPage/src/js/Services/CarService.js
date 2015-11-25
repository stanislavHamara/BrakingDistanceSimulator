angular.module('CarService', [])
    .factory('CarService', function () {
        var mesh;
        var instance;
        var carGroup = new THREE.Object3D();

        function JSONLoad(scene, url, id, camera) {
            var loader = new THREE.JSONLoader();

            loader.load(url, function (geometry, materials) {
                mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
                loader.onLoadComplete(materials);
            });

            loader.onLoadComplete = function (materials) {
                mesh.scale.set(0.1, 0.1, 0.1);
                mesh.overdraw = true;
                mesh.castShadow = true;
                mesh.position.set(0, 0, -100);
                for (var i = 0; i < materials.length; i++) {
                    materials[i].side = THREE.DoubleSide;
                }

                if (id == 1) {
                    carGroup.add(mesh);
                    camera.target = mesh;
                } else {
                    addWheels(mesh);
                }

                if (carGroup.children.length == 5) {
                    scene.add(carGroup);
                    carGroup.rotation.y = 1;
                    carGroup.position.set(70,0,0);
                    console.log(carGroup);
                }
            }
        }

        function addWheels(mesh) {
            for (var j = 0; j < 4; j++) {
                instance = mesh.clone();
                switch (j) {
                    case 1:
                        instance.position.set(285, 0, -100);
                        break;
                    case 2:
                        instance.position.set(-20, 0, -100);
                        instance.rotation.y = Math.PI;
                        break;
                    case 3:
                        instance.position.set(-304, 0, -100);
                        instance.rotation.y = Math.PI;
                        break;
                }
                carGroup.add(instance);
            }
        }

        return {
            getCar: function (scene, camera) {
                JSONLoad(scene, "dist/js/models/body.js", 1, camera);
                JSONLoad(scene, "dist/js/models/wheel.js", 2);
            }
        }
    });
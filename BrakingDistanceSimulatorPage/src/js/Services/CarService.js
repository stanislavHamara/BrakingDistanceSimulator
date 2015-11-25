angular.module('CarService', [])
    .factory('CarService', function () {
        var mesh;
        var car = [];

        function JSONLoad(scene) {
            var loader = new THREE.JSONLoader();

            loader.load("dist/js/models/mesh.js", function (geometry, materials) {
                console.log(materials);
                mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
                mesh.position.set(0, -220, -100);
                mesh.scale.set(0.1, 0.1, 0.1);
                mesh.overdraw = true;
                mesh.castShadow = true;
                mesh.traverse(function (node) {
                    if (node.material) {
                        node.material.side = THREE.DoubleSide;
                    }
                });
                for (var i = 0; i < materials.length; i++) {
                    materials[i].side = THREE.DoubleSide;
                }
                loader.onLoadComplete();
            });

            loader.onLoadComplete = function () {
                scene.add(mesh);
                mesh.rotation.y = 1;
            }
        }

        return {
            getCar: function (scene) {
                JSONLoad(scene);
            }
        }
    });
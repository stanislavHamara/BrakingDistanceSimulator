angular.module('StatsService', [])
    .factory('StatsService', function () {

        var stats = new Stats();
        stats.setMode(0); // 0: fps, 1: ms, 2: mb

        stats.domElement.style.position = 'absolute';
        stats.domElement.style.right = '0px';
        stats.domElement.style.top = '0px';

        var update = function () {
            stats.begin();
            stats.end();
            requestAnimationFrame(update);
        };

        requestAnimationFrame(update);

        return {
            getStats: function(){
                return stats;
            }
        }
    });
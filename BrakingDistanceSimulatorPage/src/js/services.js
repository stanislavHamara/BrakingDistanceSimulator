angular.module('simulator.services',[])
    .factory('Properties', function(){
        var surfaces = ['Asphalt','Grit','Sand','Ice','Mud'];
        var weather = ['Dry', 'Wet', 'Icy'];
        return {
            getSurfaces: function() {
                return surfaces;
            },
            getWeather: function(){
                return weather;
            }
        }
    });
angular.module('simulator.services',[])
    .factory('Properties', function(){
        var surfaces = ['Asphalt','Grit','Sand','Ice','Mud'];
        var weather = ['Dry', 'Wet', 'Icy'];

        var Properties = {
            surface: surfaces[0],
            weather: weather[0]
        }

        return {
            getSurfaces: function() {
                return surfaces;
            },
            getWeather: function(){
                return weather;
            },

            getSelectedSurface: function(){
              return Properties.surface;
            },
            setSelectedSurface: function (surface) {
                Properties.surface = surface;
            },

            getSelectedWeather: function(){
                return Properties.weather;
            },
            setSelectedWeather: function(weather){
                Properties.weather = weather;
            }
        }
    });
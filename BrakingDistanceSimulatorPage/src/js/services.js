angular.module('simulator.services',[])
    .factory('Properties', function(){
        var surfaces = ['Asphalt','Grit','Sand','Ice','Mud'];
        var weather = ['Dry', 'Wet', 'Icy'];

        var selectedSurface = "Asphalt";
        var selectedWeather = "Dry";
        
        return {
            getSurfaces: function() {
                return surfaces;
            },
            getWeather: function(){
                return weather;
            },

            getSelectedSurface: function(){
              return selectedSurface;
            },
            setSelectedSurface: function (surface) {
                selectedSurface = surface;
            },

            getSelectedWeather: function(){
                return selectedWeather;
            },
            setSelectedWeather: function(weather){
                selectedWeather = weather;
            }
        }
    });
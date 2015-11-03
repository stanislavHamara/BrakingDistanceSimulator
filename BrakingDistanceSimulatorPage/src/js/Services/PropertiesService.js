angular.module('PropertiesService',[])
    .factory('PropertiesService', function(){
        var surfaces = ['Asphalt','Grit','Sand','Ice','Mud'];
        var weather = ['Dry', 'Wet', 'Icy'];

        var Simulation = {
            speed: 0,
            imperial: true,
            surface: surfaces[0],
            weather: weather[0]
        };

        return {
            getSurfaces: function() {
                return surfaces;
            },
            getWeather: function(){
                return weather;
            },

            getSelectedSurface: function(){
              return Simulation.surface;
            },
            setSelectedSurface: function (surface) {
                Simulation.surface = surface;
            },

            getSelectedWeather: function(){
                return Simulation.weather;
            },
            setSelectedWeather: function(weather){
                Simulation.weather = weather;
            },
            setSpeed: function (speed, imperial) {
                Simulation.speed = speed;
                Simulation.imperial = imperial;
            },
            getUserInput: function(){
                return Simulation;
            }
        }
    });
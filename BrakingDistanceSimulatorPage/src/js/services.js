angular.module('simulator.services',[])
    .factory('Properties', function(){
        var surfaces = ['Asphalt','Grit','Sand','Ice','Mud'];
        var weather = ['Dry', 'Wet', 'Icy'];

        var Simulation = {
            speed: 0,
            units: 'km/h',
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
            setSpeed: function (speed, units) {
                Simulation.speed = speed;
                Simulation.units = units;
            },
            getSimulation: function(){
                return Simulation;
            }
        }
    });
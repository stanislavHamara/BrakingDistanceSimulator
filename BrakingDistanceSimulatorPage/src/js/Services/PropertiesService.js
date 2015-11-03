angular.module('PropertiesService',[])
    .factory('PropertiesService', function(){
        var surfaces = ['Asphalt','Grit','Sand','Ice','Mud'];
        var condition = ['Dry', 'Wet'];

        var Simulation = {
            speed: 0,
            imperial: true,
            surface: surfaces[0],
            condition: condition[0]
        };

        return {
            getSurfaces: function() {
                return surfaces;
            },
            getConditions: function(){
                return condition;
            },

            getSelectedSurface: function(){
              return Simulation.surface;
            },
            setSelectedSurface: function (surface) {
                Simulation.surface = surface;
            },

            getSelectedCondition: function(){
                return Simulation.condition;
            },
            setSelectedCondition: function(condition){
                Simulation.condition = condition;
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
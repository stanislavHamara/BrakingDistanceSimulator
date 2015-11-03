angular.module('PhysicsService', [])
    .factory('PhysicsService', function () {

        var g = 9.81; //standard gravity value
        var v, cf; //velocity and coefficient of friction

        var getThinkingDistance = function(v){
            return  v * 3 / 10; //m;
        };

        return {
            getStoppingDistance: function (userInput) {
                var v = (userInput.imperial ? userInput.speed : userInput.speed / 1.6); //mph
                return {
                    thinkingDistance: getThinkingDistance(v),
                    brakingDistance: 0
                };
            }
        };
    });
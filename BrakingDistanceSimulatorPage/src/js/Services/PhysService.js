angular.module('PhysicsService', [])
    .factory('PhysicsService', function () {

        var g = 9.81; //standard gravity value
        var v, cf; //velocity and coefficient of friction

        var getCoefficient = function(surface, condition){
            return 0.7;
        };

        var getThinkingDistance = function (v) {
            return v * 3 / 10; //m;
        };

        var getBrakingDistance = function (v, cf) {
            return Math.pow(v * 0.45, 2) / (2 * cf * g); //m
        };

        return {
            getStoppingDistance: function (userInput) {
                v = (userInput.imperial ? userInput.speed : userInput.speed / 1.6); //mph
                cf = getCoefficient(userInput.surface, userInput.condition);
                return {
                    thinkingDistance: getThinkingDistance(v),
                    brakingDistance: getBrakingDistance(v, cf) // coefficient of friction used for dry asphalt
                };
            }
        };
    });
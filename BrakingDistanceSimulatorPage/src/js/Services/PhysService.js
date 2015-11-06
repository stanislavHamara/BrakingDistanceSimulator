angular.module('PhysicsService', [])
    .factory('PhysicsService', function () {

        /*
         Coefficients of friction

         Surface/Condition	Dry	 Wet
         Asphalt	        0.7	 0.6
         Gravel	            0.7	 0.75
         Sand	            0.45 0.5
         Ice	            0.15 0.1
         Snow	            0.3	 0.6
         */

        var g = 9.81; //standard gravity value
        var v, cf; //velocity and coefficient of friction

        //Associative arrays, roughly equivalent to Dictionaries or Hashmaps
        var coefficients = [];
        coefficients['Asphalt'] = [0.7, 0.6];
        coefficients['Gravel'] = [0.7, 0.75];
        coefficients['Sand'] = [0.45, 0.5];
        coefficients['Ice'] = [0.15, 0.10];
        coefficients['Snow'] = [0.3, 0.6];

        var getCoefficient = function (surface, condition) {
            if (condition == "Dry")
                return coefficients[surface][0];
            else
                return coefficients[surface][1];
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
                console.log(cf);
                return {
                    thinkingDistance: getThinkingDistance(v),
                    brakingDistance: getBrakingDistance(v, cf) // coefficient of friction used for dry asphalt
                };
            }
        };
    });
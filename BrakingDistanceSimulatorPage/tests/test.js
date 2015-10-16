describe('PropertiesController', function () {

    var $controller;
    var $scope = {};

    beforeEach(function() {
        module('simulator.services');
        module('simulator.controllers');
        inject(function (_$controller_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
        });
        $controller('PropertiesController', {$scope: $scope});

    });

    describe('speed control', function () {
        it('should change when the control button is pressed', function () {
            $scope.setSpeed(5);
            expect($scope.speed).toBe(65);
        });
    });

    describe('units control', function () {
        it('should change to imperial when turned on', function () {
            $scope.togglePreferences.imperial = true;
            $scope.setUnits();
            expect($scope.units).toBe('mph');
        });

        it('should change to metric when turned off', function () {
            $scope.togglePreferences.imperial = false;
            $scope.setUnits();
            expect($scope.units).toBe('km/h');
        });
    });

    //find out how to do test cases
    describe('surface control', function () {
        it('should set the selected surface after being selected from the menu', function () {
            $scope.setSurface('Grid');
            expect($scope.checkSelectedSurface('Grid')).toBe(true);
        });
    });

});
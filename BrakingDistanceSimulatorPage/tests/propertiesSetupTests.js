describe('PropertiesController', function () {
    var $controller;
    var $scope = {};

    describe('test', function () {
        it("should work", function(){
            expect(5).toBe(5);
        });
    });

    beforeEach(function () {
        beforeEach(module('Properties'));
        beforeEach(module('PropertiesService'));
        inject(function (_$controller_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
        });
        $controller('PropertiesController', {$scope: $scope});

    });

    /*
    describe('speed control', function () {
        it('should change when the control button is pressed', function () {
            $scope.setSpeed(5);
            expect($scope.speed).toBe(45);
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
    describe('surface control selection', function () {
        it('should match selected surface in Properties', function () {
            $scope.setSurface('Grid');
            expect($scope.checkSelectedSurface('Grid')).toBe(true);
        });

        it('should not match other surfaces', function () {
            $scope.setSurface('Grid');
            expect($scope.checkSelectedSurface('Asphalt')).toBe(false);
        });
    });

    describe('condition control selection', function () {
        it('should match selected condition in Properties', function () {
            $scope.setCondition('Dry');
            expect($scope.checkSelectedCondition('Dry')).toBe(true);
        });

        it('should not match other condition', function () {
            $scope.setCondition('Dry');
            expect($scope.checkSelectedCondition('Icy')).toBe(false);
        });
    });

    describe('start simulation button', function () {
        it('should return an object with all the simulation data', function () {
            $scope.togglePreferences.imperial = true;
            $scope.setUnits();
            $scope.setSpeed(-10);
            $scope.setSurface('Sand');
            $scope.setCondition('Wet');

            var Expected = {
                speed: 30,
                imperial: true,
                surface: 'Sand',
                condition: 'Wet'
            };

            expect($scope.startSimulation()).toEqual(Expected);
        });
    });*/

});
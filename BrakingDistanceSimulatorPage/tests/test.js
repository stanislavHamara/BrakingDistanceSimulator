describe('PropertiesController', function() {

    var $controller;
    var $scope = {};

    beforeEach(function(){
        module('simulator.services');
        module('simulator.controllers');
    });

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

   describe('speed', function(){
      it('should be 60 on launch', function () {
          var controller = $controller('PropertiesController', {$scope : $scope});
          expect($scope.speed).toBe(60);
      });
   });
});
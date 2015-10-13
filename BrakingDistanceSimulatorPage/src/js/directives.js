angular.module('simulator.directives',[])
    .directive("bdsMenu", function(){
        return{
            restrict: 'E',
            templateUrl: './dist/templates/bds-menu.html'
        }
    });
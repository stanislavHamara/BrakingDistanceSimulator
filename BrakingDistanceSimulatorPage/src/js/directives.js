angular.module('simulator.directives', [])
    .directive("bdsMenu", function () {
        return {
            restrict: 'E',
            templateUrl: './dist/templates/bds-menu.html'
        }
    })

    .directive('bdsControlPanel', function () {
        return {
            restrict: 'E',
            templateUrl: './dist/templates/bds-control-panel.html'
        }
    });
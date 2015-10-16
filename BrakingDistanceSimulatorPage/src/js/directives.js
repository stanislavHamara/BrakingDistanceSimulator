angular.module('simulator.directives', [
    'frapontillo.bootstrap-switch'])
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
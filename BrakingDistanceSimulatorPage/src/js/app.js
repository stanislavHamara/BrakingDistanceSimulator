angular.module('simulator', ['simulator.directives','simulator.controllers', 'simulator.services'])
    .config(function(){
        $("[name='my-checkbox']").bootstrapSwitch();
    });


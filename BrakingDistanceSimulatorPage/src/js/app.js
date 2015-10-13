angular.module('simulator', ['simulator.directives','simulator.controllers'])
    .config(function(){
        $("[name='my-checkbox']").bootstrapSwitch();
    });


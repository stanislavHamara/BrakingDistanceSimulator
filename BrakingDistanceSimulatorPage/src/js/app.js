angular.module('simulator', ['simulator.directives'])
    .config(function(){
        $("[name='my-checkbox']").bootstrapSwitch();
    });


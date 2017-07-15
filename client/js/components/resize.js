
define([
	'angularAMD'
], function (angularAMD) {
	'use strict';
	angularAMD.directive('resize', function ($window) {
	return function (scope, element) {

		
		var w = angular.element($window);


		 scope.$on('$viewContentLoaded', function(){
    
     	scope.getWindowDimensions = function () {
			
			return { 'h': window.innerHeight, 'w': window.innerWidth};
		};
			scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
			scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;
            
            scope.style = function () {
				return { 
                    'height': (newValue.h - 100) + 'px',
                    'width': (newValue.w - 100) + 'px' ,
                    'position': newValue.inherit
                };
			};
            
		}, true);
	
		w.bind('resize', function () {
			scope.$apply();
		});
  });
	
	
	}
})
});
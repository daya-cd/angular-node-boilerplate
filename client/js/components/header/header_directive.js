define([
	'angularAMD',
	'components/header/header_controller'
], function (angularAMD, headerController) {
	'use strict';
	angularAMD.directive('header', function () {
	    return {
	    	restrict: "A",
	    	controller: 'headerController',
	    	templateUrl: 'js/components/header/header.html'
	    };
  	});
});
define([
	'angularAMD',
	'components/footer/footer_controller'
], function(angularAMD, footerController) {
	'use strict';
	angularAMD.directive('footer', function() {
		return {
			restrict: "A",
			templateUrl: 'js/components/footer/footer.html',
			controller: 'footerController',
		};
	});
});
define([
	'angularAMD',
	], function(angularAMD) {
		'use strict';
		angularAMD.controller('logoutController', ['$scope', '$location', '$state', '$http', function($scope, $location, $state, $http,$rootScope) {
			$scope.credentials = {};
			$scope.error = false;


	//Log Out
	$http({
		method: "GET",
		url: "/api/logout"
	}).success(function(data, status, headers, config) {
		if (status == 200) {
			//Logout Success
			// $rootScope.isLoggedIn = false;
			// $rootScope.isLoggedIn = false;
			$location.path('/login');
		}
	}).error(function(data, status, headers, config) {
		console.log(data);
	});
  
	
}]);

});
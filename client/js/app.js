define(['common'], function(angularAMD) {
	'use strict';

	var app = angular.module('app', ['ui.bootstrap','ui.router', 'ngResource', 'ngAnimate','angucomplete']);

	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('register', angularAMD.route({
			url: '/register',
			templateUrl: 'js/views/register/register.tpl.html',
			controllerUrl: 'js/views/register/register.controller.js'
		}))

		.state('login', angularAMD.route({
			url: '/login',
			templateUrl: 'js/views/register/login/login.tpl.html',
			controllerUrl: 'js/views/register/login/login.controller.js'
		}))
		.state('resetpassword', angularAMD.route({
			url: '/resetpassword',
			templateUrl: 'js/views/register/resetpassword/resetpassword.tpl.html',
			controllerUrl: 'js/views/register/resetpassword/resetpassword.controller.js'
		}))

		.state('confirmpassword/?token=value', angularAMD.route({
			url: '/confirmpassword/?token=value',
			templateUrl: 'js/views/register/confirmpassword/confirmpassword.tpl.html',
			controllerUrl: 'js/views/register/confirmpassword/confirmpassword.controller.js'
		}))

		.state('logout', angularAMD.route({
			url: '/logout',
			templateUrl:'js/views/register/logout.tpl.html',
			controllerUrl: 'js/views/register/logout.controller.js'
		}))



		.state('profile/myprofile',angularAMD.route({
			url: '/profile/myprofile',
			templateUrl:'js/views/profile/myprofile.tpl.html',
			controllerUrl:'js/views/profile/profile.controller.js'
		}))

	

		.state('profile/edit/:id',angularAMD.route({
			url: '/profile/edit/:id',
			templateUrl:'js/views/profile/myprofile.tpl.html',
			controllerUrl:'js/views/profile/profile.controller.js'
		}))






		$urlRouterProvider.otherwise('/register');

	}]);


app.run(['$location', '$rootScope',
	function($location, $rootScope) {
		
		if($location.$$url=="/feedback/report")
		{
			$("#header").hide();

		}



	}
	]);
return angularAMD.bootstrap(app);
});
define([
	'angularAMD',
	], function(angularAMD) {
		'use strict';
		angularAMD.controller('registerController', ['$scope', '$location', '$state', '$http', function($scope, $location, $state, $http) {
			$scope.credentials = {};
			$scope.error = false;
			$scope.registered = false;
			$scope.alreadyExists = false;
			$scope.notAuthorizedToRegister = false;
			$scope.teams = {};
			$scope.register = function() {
				$scope.error = false;
				$scope.registered = false;
				$scope.alreadyExists = false;
				$scope.notAuthorizedToRegister = false;

				console.log($.trim($scope.credentials.first))

			//Validation
			if ($.trim($scope.credentials.first) != '' && $.trim($scope.credentials.last) != '' && $.trim($scope.credentials.email) != '' && $.trim($scope.credentials.password) != '' && $.trim($scope.credentials.confirmpassword) != '' && $.trim($scope.credentials.company) != '') {

				//Confirm Password Check
				if($.trim($scope.credentials.password) !== $.trim($scope.credentials.confirmpassword)){
					alert('Passwords must match');
					return;
				}

				var dataObj = {
					"fname": $.trim($scope.credentials.first),
					"lname": $.trim($scope.credentials.last),
					"email": $.trim($scope.credentials.email),
					"password": $.trim($scope.credentials.confirmpassword),
					"company": $.trim($scope.credentials.company),
					"fullname":$scope.credentials.first+" "+$scope.credentials.last,
				};

                console.log(dataObj);

				//Save data
				$http({
					method: "POST",
					url: "/api/register",
					data: JSON.stringify(dataObj)
				}).success(function(data, status, headers, config) {
					console.log(data);
					if (status == 201) {

						$scope.registered = true;
						$scope.sendemail($scope.credentials.email,$scope.credentials.first);
					}
				}).error(function(data, status, headers, config) {
					console.log(data);
					if (data.message == 'Emailid already exists') {
						$scope.alreadyExists = true;
					} else {
						$scope.error = true;
					}
				});
			}else{
				alert('Please fill in all the fields');
			}



		};
		$scope.sendemail=function(email,name)
		{

			var emailObj = {
				"email": email,
				"name":name
			};
			console.log(emailObj);

			$http({
				method: "POST",
				url: "/api/thankyouemail",
				data: JSON.stringify(emailObj)
			}).success(function(data, status, headers, config) {

				$scope.registered = true;
				$scope.credentials = {};

			}).error(function(data, status, headers, config) {
				$scope.error = true;
			});



		};


	}]);

});
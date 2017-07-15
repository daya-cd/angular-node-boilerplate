define([
    'angularAMD',
], function(angularAMD) {
    'use strict';

    angularAMD.controller('loginController', ['$scope', '$location', '$state', '$http', function($scope, $location, $state, $http) {
        
       
    $scope.credentials = {};
    
    $scope.error = false;

    $scope.login = function() {
        $scope.error = false;
        $scope.loggedIn = false;
        var dataObj = {
            "email": $.trim($scope.credentials.email),
            "password": $.trim($scope.credentials.password)
        };

        // console.log(dataObj);

        //Save data
        $http({
            method: "POST",
            url: "/api/login",
            data: JSON.stringify(dataObj)
        }).success(function(data, status, headers, config) {
            if (status == 200) {
                // console.log("Login Success");
                $location.path('/profile/myprofile');
            }
        }).error(function(data, status, headers, config) {
            console.log(data);
            $scope.error = true;
        });
    };


    }]);

});
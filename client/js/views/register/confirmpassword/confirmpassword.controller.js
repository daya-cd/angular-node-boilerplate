define([
    'angularAMD',
    ], function(angularAMD) {
        'use strict';

        angularAMD.controller('confirmpasswordController', ['$scope', '$location', '$state', '$http', function($scope, $location, $state, $http) {

            $scope.credentials = {};
            $scope.error = false;
            $scope.success=false;
            $scope.token=$state.params.token;


        //check token
        $http({
            method: "GET",
            url: "/api/gettoken/"+$scope.token,
        }).success(function(data, status, headers, config) {

            if (data =="not valid token") {

                $location.path('/register');
            }
        }).error(function(data, status, headers, config) {
            $location.path('/register');
        });










        $scope.confirmpassword=function()
        {

            if($.trim($scope.credentials.password) !== $.trim($scope.credentials.confirmpassword))
            {
                $scope.error = true;                    
            }
            else{

               var dataObj = {
                "token": $.trim($scope.token),
                "password": $.trim($scope.credentials.confirmpassword)
            };

            $http({
                method: "POST",
                url: "/api/updatepassword",
                data: JSON.stringify(dataObj)
            }).success(function(data, status, headers, config) {
                console.log(data);
                $scope.success = true;
                $scope.credentials.email = null;
                $location.path('/login');
            }).error(function(data, status, headers, config) {
                $scope.admin = true;
            });
        }

    };



}]);

});
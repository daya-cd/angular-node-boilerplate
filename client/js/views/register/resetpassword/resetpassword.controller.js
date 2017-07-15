define([
    'angularAMD',
    ], function(angularAMD) {
        'use strict';

        angularAMD.controller('restpasswordController', ['$scope', '$location', '$state', '$http', function($scope, $location, $state, $http) {

            $scope.credentials = {};
            $scope.error = false;
            $scope.success=false;
            $scope.nofound=false;
            $scope.resetpassword=function()
            {

               $scope.error = false;
               $scope.success=false;
               $scope.nofound=false;
               var dataObj = {
                "email": $.trim($scope.credentials.email)
            };

            $http({
                method: "POST",
                url: "/api/resetpassword",
                data: JSON.stringify(dataObj)
            }).success(function(data, status, headers, config) {

                if(data.updated==1)
                {        

                    $scope.sendemail($scope.credentials.email,data.token,data.name);
                }
                else
                {
                    $scope.nofound = true;
                    $scope.credentials.email = null;
                }
            }).error(function(data, status, headers, config) {
                $scope.error = true;
            });

        };
        $scope.sendemail=function(email,token,name)
        {

         var emailObj = {
            "email": email,
            "token":token,
            "name":name
        };
        console.log(emailObj);

        $http({
            method: "POST",
            url: "/api/sendresetemail",
            data: JSON.stringify(emailObj)
        }).success(function(data, status, headers, config) {

           $scope.success = true;
           $scope.credentials.email = null;
       }).error(function(data, status, headers, config) {
        $scope.error = true;
    });



   };



}]);

});
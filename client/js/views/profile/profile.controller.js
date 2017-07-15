define([
    'angularAMD',
    'service/authenticationservice'
], function(angularAMD) {
    'use strict';

    angularAMD.controller('profileController', ['$scope', '$location', '$state', '$http', 'AuthenticationService', function($scope, $location, $state, $http, AuthenticationService) {

        $scope.error = false;
        $scope.credentials = {};
        // $scope.page = 'users';
        $scope.x = {
            edit: false
        };


        AuthenticationService.isUserLogged(function(result) {

            $scope.userName = result.name;
            $scope.profile = result;
    

        });

        AuthenticationService.isUserAuthenticated();
        $scope.updateuser = function() {
            var dataObj = {
                "id": $.trim($scope.credentials.id),
                "fname": $.trim($scope.credentials.first),
                "lname": $.trim($scope.credentials.last),
                "email": $.trim($scope.credentials.email),
                "password": $.trim($scope.credentials.confirmpassword),
                "company": $.trim($scope.credentials.company),
                "fullname":$scope.credentials.first+" "+$scope.credentials.last,
            };
            console.log(dataObj);

            //Validation
            if ($.trim($scope.credentials.first) != '' && $.trim($scope.credentials.last) != '' && $.trim($scope.credentials.email) != '' && $.trim($scope.credentials.company) != '') {


                //Confirm Password Check
                if ($.trim($scope.credentials.password) !== $.trim($scope.credentials.confirmpassword)) {
                    alert('Passwords must match');
                    return;
                }

                //Save data
                $http({
                    method: "PUT",
                    url: "/api/updateprofile",
                    data: JSON.stringify(dataObj)
                }).success(function(data, status, headers, config) {
                    console.log("updated profile");
                    //Update profile
                    AuthenticationService.isUserLogged(function(result) {
                        $scope.profile = result;
                        $scope.x.edit = false;
                    });
                }).error(function(data, status, headers, config) {

                });
            } else {
                alert('Please fill in all the fields');
            }

        };



    }]);

});
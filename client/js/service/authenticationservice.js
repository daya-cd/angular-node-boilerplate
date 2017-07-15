define([
    'angularAMD',
    ], function(angularAMD) {
        'use strict';

        angularAMD.factory("AuthenticationService", function($http,$rootScope,$location) {


        return {
                isUserAuthenticated: function(callback) {
                 $http({
                    method: "GET",
                    url: "/api/checkadmin"
                }).success(function(data, status, headers, config) {
                    
                    if(data=="not admin")
                    {
                         $rootScope.isAdmin = false;
                         $location.path('/profile/myprofile');
                    }
                    else
                    {
                        $rootScope.isAdmin = true;
                        
                    
                    }

                
            }).error(function(data, status, headers, config) {
                console.log(data);
             
            });
        },     
        isUserLogged: function(callback) {
         $http({
            method: "GET",
            url: "/api/currentuser"
        }).success(function(data, status, headers, config) {
            if (status == 401) {
                    //User is not authorized
                    $rootScope.isLoggedIn = false;
                    $location.path('/login');
                } else {
                    //User is authorized
                    $rootScope.isLoggedIn = true;
                    callback(data);
                }
            }).error(function(data, status, headers, config) {
                console.log(data);
                $rootScope.isLoggedIn = false;
                $location.path('/login');
            });
        }
    };
});

});

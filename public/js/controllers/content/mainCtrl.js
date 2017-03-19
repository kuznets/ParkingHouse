'use strict';

angular.module('myApp.main', ['ui.router'])
    // .config([
    //     '$routeProvider', function ($routeProvider) {
    //         $routeProvider.when('/', {
    //             templateUrl: 'js/main/main.html',
    //             controller: 'MainCtrl'
    //         });
    //     }
    // ])
    .controller('mainCtrl', [
        '$location',
        '$http',
        '$scope',
        '$rootScope',
        '$cookies',
        function ($location, $http, $scope, $rootScope, $cookies) {

        $rootScope.curPath = 'main';
            //$scope.email = $cookies.get('mail');
            //console.log('Cookie email: ' + $scope.email);
            // $scope.login = function () {
            //     $http.post('/api/login', { email: $scope.email }).then(function (data) {
            //         console.log = 'Auth done!!!';
            //     });
            // }
        }
    ]);
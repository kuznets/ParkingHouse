'use strict';

angular.module('myApp.script', ['ngCookies'])

    .controller('MainCtrl', [
        '$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
        $scope.url = 'http://localhost:3000/api/';
        $scope.users = [
            {username: 'Regular', password: 'user'},
            {username: 'Premium', password: 'user'}
        ];
        $scope.orders = [];

        $scope.login = function (user) {
            $http({
                method: 'POST',
                url: $scope.url + 'user/' + user.username + '/' + user.password
            })
                .success(function (response) {
                    console.log(response);
                    $scope.checkAuth();
                })
        }

        $scope.logout = function () {
            $cookies.remove('username');
            $cookies.remove('token');
            $scope.checkAuth();
        }

        $scope.checkAuth = function () {
            $scope.cookieUser = $cookies.get('username');
            if ($cookies.get('username') == undefined && $cookies.get('token') == undefined) {
                $scope.showAuthForm = true;
            } else {
                $scope.showAuthForm = false;
                $scope.getAllOrders();
            }
        }

        $scope.getAllOrders = function () {
            $http({
                method: 'GET',
                url: $scope.url + 'orders'
            })
                .success(function (response) {
                    $scope.orders = response;
                })
        }
        
        $scope.addOrder = function () {
            $scope.newOrder = {};
            $scope.newOrder.username = $cookies.get('username');
            $scope.newOrder.start_park = $scope.startPark;
            $scope.newOrder.stop_park = $scope.stopPark;
            console.log($scope.newOrder);
            var date = new Date(2017, 2, 14, 8, 12);
            console.log($scope.startPark);
        }

    }]);
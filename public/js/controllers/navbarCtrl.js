'use strict';

angular.module('myApp.navbar', [])

    .controller('navbarCtrl', [
        '$scope', '$rootScope', '$cookies', '$location', function ($scope, $rootScope, $cookies, $location) {

            if ($cookies.get('username') && $cookies.get('token')) {
                $rootScope.login_username = $cookies.get('username')
            }

            $scope.logout = function () {
                $cookies.remove('username');
                $cookies.remove('token');
                $rootScope.login_username = undefined;

                $location.path('/index.html');
            }

            // $scope.url = 'http://localhost:3000/api/';
            // $scope.users = [
            //     {username: 'Regular', password: 'user'},
            //     {username: 'Premium', password: 'user'}
            // ];
            // $scope.orders = [];
            // $scope.allInvoices = [];
            // $scope.oneInvoice = [];
            // $scope.monthlyFee = {};
            // $scope.showInvoiceFrame = false;
            //
            //
            // $scope.login = function (user) {
            //     $http({
            //         method: 'POST',
            //         url: $scope.url + 'user/' + user.username + '/' + user.password
            //     })
            //         .success(function (response) {
            //             console.log(response);
            //             $scope.checkAuth();
            //         })
            // }
            //
            // $scope.logout = function () {
            //     $cookies.remove('username');
            //     $cookies.remove('token');
            //     $scope.checkAuth();
            // }
            //
            // $scope.checkAuth = function () {
            //     $scope.cookieUser = $cookies.get('username');
            //     if ($cookies.get('username') == undefined && $cookies.get('token') == undefined) {
            //         $scope.showAuthForm = false;
            //     } else {
            //         $scope.showAuthForm = true;
            //         $scope.getAllOrders();
            //         $scope.getAllInvoices();
            //     }
            // }
            //
            // $scope.getAllOrders = function () {
            //     $http({
            //         method: 'GET',
            //         url: $scope.url + 'orders',
            //     })
            //         .success(function (response) {
            //             $scope.orders = $scope.msToDateOrder(response);
            //         })
            // }
            //
            // $scope.getAllInvoices = function () {
            //     $http({
            //         method: 'GET',
            //         url: $scope.url + 'invoices',
            //     })
            //         .success(function (response) {
            //             $scope.allInvoices = $scope.msToDateInvoice(response);
            //         })
            // }
            //
            // $scope.getInvoiceById = function (invoice) {
            //     var id = invoice.id;
            //
            //     $http({
            //         method: 'GET',
            //         url: $scope.url + 'invoice/' + id,
            //     })
            //         .success(function (response) {
            //             $scope.oneInvoice = response;
            //             //console.log(response[0].orders);
            //             $scope.orderList = $scope.msToDateOrder(response[0].orders);
            //             var role = response[0].role;
            //             if (role == 'Premium') {
            //                 $scope.monthlyFee.desc = 'Monthly Fee:'
            //                 $scope.monthlyFee.total = '20.00'
            //             }
            //             $scope.showInvoiceFrame = true;
            //         })
            // }
            //
            // $scope.msToDateOrder = function (date) {
            //     //console.log(date);
            //     date.forEach(function (item, i, arr) {
            //         item.start_date = $scope.dataViewBuilder(item.start_date);
            //         item.stop_date = $scope.dataViewBuilder(item.stop_date);
            //     });
            //     return date;
            // }
            //
            // $scope.msToDateInvoice = function (date) {
            //         date.forEach(function (item, i, arr) {
            //         item.start_date = $scope.dataViewBuilder(item.start_date);
            //         item.stop_date = $scope.dataViewBuilder(item.stop_date);
            //         item.date = item.start_date + ' - ' + item.stop_date;
            //     });
            //     return date;
            // }
            //
            // $scope.dataViewBuilder = function (data) {
            //     var dateFormat = new Date;
            //     dateFormat.setTime(data);
            //     var getYear = dateFormat.getFullYear();
            //     var getMonth = dateFormat.getMonth() + 1;
            //     getMonth = $scope.addZero(getMonth);
            //     var getDay = $scope.addZero(dateFormat.getDate());
            //     var getHour = $scope.addZero(dateFormat.getHours());
            //     var getMin = $scope.addZero(dateFormat.getMinutes());
            //     return getDay + '.' + getMonth + '.' + getYear + ' ' + getHour + ':' + getMin;
            // }
            //
            // $scope.addZero = function (i) {
            //     if (i < 10) {
            //         i = "0" + i;
            //     }
            //     return i;
            // }
            //
            // $scope.addOrder = function () {
            //     $scope.newOrder = {};
            //     $scope.newOrder.username = $cookies.get('username');
            //     $scope.newOrder.start_date = +$scope.startPark;
            //     $scope.newOrder.stop_date = +$scope.stopPark;
            //     $http({
            //         method: 'POST',
            //         url: $scope.url + 'order',
            //         data: $scope.newOrder
            //     })
            //         .success(function (response) {
            //             $scope.checkAuth();
            //         })
            // }
            //
            // $scope.closePopUpDialog = function() {
            //     $scope.showInvoiceFrame = false;
            // };

        }]);
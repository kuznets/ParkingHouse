/**
 * The Parking House web site.
 *
 * routes:
 *  http://damain-name.com/
 */
'use strict';

angular.module('myApp.main', ['ui.router', 'ui.bootstrap', 'ui.bootstrap.datetimepicker'])

    .controller('mainCtrl', [
        '$location',
        '$http',
        '$scope',
        '$rootScope',
        '$cookies',
        'errorMsgService',
        function ($location, $http, $scope, $rootScope, $cookies, errorMsgService) {

            $rootScope.curPath = 'main';
            $scope.url = 'http://localhost:3000/api/';
            let serviceMessages = errorMsgService;

            //If user not login in, can't send request to API
            if ($rootScope.login_username != undefined) {
                //console.log('login_username not undefined');
                //Get all orders
                $scope.orders = [];
                //$scope.error_msg = [];
                $scope.getAllOrders = function () {
                    $http({
                        method: 'GET',
                        url: $scope.url + 'orders',
                    }).then(function success(res) {
                        //console.log('Get all orders: ', res);
                        if (res.data.error_msg) {
                            $scope.error_msg = res.data.error_msg;
                        }
                        if (res.data.message == 'OK') {
                            // $scope.orders = res.data.body;
                            $scope.orders = $scope.msToDateOrder(res.data.body);
                        }

                    })
                    // .success(function (response) {
                    //     $scope.orders = $scope.msToDateOrder(response);
                    // })
                }
                $scope.getAllOrders();

                //Add new order
                $scope.addNewOrder = function (startData, stopData) {
                    let startDateMs = Date.parse(startData);
                    let stopDateMs = Date.parse(stopData);
                    //validation
                    let validMsg = startHourLessThenStopHour(startDateMs, stopDateMs);
                    if (Object.keys(validMsg).length != 0) {
                        $scope.error_msg = validMsg;
                        if (validMsg.error_msg.datepicker) {
                            let datepickerBlock = angular.element(document.querySelector('.datepicker'));
                            datepickerBlock.addClass('has-error');
                            let startDtWrapper = angular.element(document.querySelector('.startDateForm'));
                            startDtWrapper.addClass('has-error');
                            let stopDtWrapper = angular.element(document.querySelector('.stopDateForm'));
                            stopDtWrapper.addClass('has-error');
                            $scope.err_msg_datepicker = serviceMessages.date[validMsg.error_msg.datepicker];
                        }
                    } else {
                        if ($cookies.get('username') != undefined && $cookies.get('token') != undefined) {
                            $scope.userOrder = {};
                            $scope.userOrder.startDate = startDateMs;
                            $scope.userOrder.stopDate = stopDateMs;
                            //New order process
                            $http({
                                method: 'POST',
                                url: $scope.url + 'order',
                                data: $scope.userOrder
                            }).then(function success(res) {
                                if (res.data.error_msg) {
                                    $scope.error_msg = res.data.error_msg;
                                }
                                if (res.data.message == 'order added') {
                                    //console.log('Order adder.', res.data.body);
                                    $scope.orders = $scope.msToDateOrder(res.data.body);
                                }
                            })
                        }
                    }
                }
            }

            //Datetimepicker
            $scope.startDate = new Date();
            $scope.stopDate = new Date();

            $scope.startDateTimeNow = function () {
                $scope.startDate = new Date();
            };
            $scope.startDateTimeNow();

            $scope.dateOptions = {
                showWeeks: true
            };

            $scope.hourStep = 1;
            $scope.minuteStep = 1;

            // 12/24 mode
            $scope.showMeridian = false;


            //Datepicker validation
            function startHourLessThenStopHour(startHour, stopHour) {
                let data = {};
                let error_msg = {};
                if (startHour > stopHour) {
                    error_msg.datepicker = '1.1';
                }
                if (Object.keys(error_msg).length != 0) {
                    data.error_msg = error_msg;
                }
                return data;
            }

            //Converts a ms to date
            $scope.msToDateInvoice = function (date) {
                date.forEach(function (item, i, arr) {
                    item.startDate = $scope.dataViewBuilder(item.startDate);
                    item.stopDate = $scope.dataViewBuilder(item.stopDate);
                    item.date = item.startDate + ' - ' + item.stopDate;
                });
                return date;
            }

            //Converts a ms to date
            $scope.msToDateOrder = function (date) {
                date.forEach(function (item, i, arr) {
                    item.startDate = $scope.dataViewBuilder(item.startDate);
                    item.stopDate = $scope.dataViewBuilder(item.stopDate);
                });
                return date;
            }

            //Convert date to "DD.MM.YYYY HH:MM" view.
            $scope.dataViewBuilder = function (data) {
                let dateFormat = new Date;
                dateFormat.setTime(data);
                let getYear = dateFormat.getFullYear();
                let getMonth = dateFormat.getMonth() + 1;
                getMonth = $scope.addZero(getMonth);
                let getDay = $scope.addZero(dateFormat.getDate());
                let getHour = $scope.addZero(dateFormat.getHours());
                let getMin = $scope.addZero(dateFormat.getMinutes());
                return getDay + '.' + getMonth + '.' + getYear + ' ' + getHour + ':' + getMin;
            }

            //Convert Month, Day, Hour and Sec to "00" view.
            $scope.addZero = function (i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }
        }
    ]);
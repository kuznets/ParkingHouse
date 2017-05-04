'use strict';

angular.module('myApp.newOrder', ['ui.router', 'ui.bootstrap', 'ui.bootstrap.datetimepicker'])

    .controller('newOrderCtrl', [
        '$location',
        '$http',
        '$scope',
        '$rootScope',
        '$cookies',
        'errorMsgService',
        function($location, $http, $scope, $rootScope, $cookies, errorMsgService){

            $scope.url = 'http://localhost:3000/api/';
            var serviceMessages = errorMsgService;

            //Datetimepicker
            $scope.startDate = new Date();
            $scope.stopDate = new Date();

            $scope.startDateTimeNow = function() {
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

            //Add new order
            $scope.addNewOrder = function(startData, stopData) {
                var startDateMs = Date.parse(startData);
                var stopDateMs = Date.parse(stopData);
                //validation
                var validMsg = startHourLessThenStopHour(startDateMs, stopDateMs);
                if (Object.keys(validMsg).length !=0) {
                    $scope.error_msg = validMsg;
                    if (validMsg.error_msg.datepicker) {
                        var datepickerBlock = angular.element(document.querySelector('.datepicker'));
                        datepickerBlock.addClass('has-error');
                        var startDtWrapper = angular.element(document.querySelector('.startDateForm'));
                        startDtWrapper.addClass('has-error');
                        var stopDtWrapper = angular.element(document.querySelector('.stopDateForm'));
                        stopDtWrapper.addClass('has-error');
                        $scope.err_msg_datepicker = serviceMessages.date[validMsg.error_msg.datepicker];
                    }
                } else {
                    if ($cookies.get('username') != undefined && $cookies.get('token') != undefined) {
                        console.log(startData);
                        console.log(startDateMs);
                        console.log(stopData);
                        console.log(stopDateMs);

                        $scope.userOrder = {};
                        $scope.userOrder.startDate = startDateMs;
                        $scope.userOrder.stopDate = stopDateMs;
                        //New order process
                        $http({
                            method: 'POST',
                            url: $scope.url + 'order',
                            data: $scope.userOrder
                        }).then(function success(res) {
                            if(res.data.error_msg) {
                                $scope.error_msg = res.data.error_msg;
                            }
                            if(res.data.message == 'order added') {
                                console.log('Order adder.');
                                console.log(res.data.body);
                            }
                            // refresh orders
                        })
                    }
                }



            }

            //Datepicker validation
            function startHourLessThenStopHour(startHour, stopHour) {
                var data = {};
                var error_msg = {};
                if (startHour > stopHour) {
                    error_msg.datepicker = '1.1';
                }
                if (Object.keys(error_msg).length != 0) {
                    data.error_msg = error_msg;
                }
                return data;
            }

        }]);
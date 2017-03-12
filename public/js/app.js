'use strict';

var app = angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'myApp.main',
    'myApp.navbar',
    'myApp.registration',
    //'myApp.errorMsgService',
]);

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider.otherwise({ redirectTo: '/' });
}]);
'use strict';

var app = angular.module('myApp', [
    'ui.router',
    'ngCookies',
    'myApp.main',
    'myApp.navbar',
    'myApp.registration',
    'myApp.login',
    'myApp.newOrder',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker',
]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'templates/content/main.html',
            controller: 'mainCtrl'
        })
        .state('registration', {
            url: '/registration',
            templateUrl: 'templates/content/registration.html',
            controller: 'registrationCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'templates/content/login.html',
            controller: 'loginCtrl'
        })
        .state('new-order', {
            url: '/new-order',
            templateUrl: 'templates/content/newOrder.html',
            controller: 'newOrderCtrl'
        });
}]);
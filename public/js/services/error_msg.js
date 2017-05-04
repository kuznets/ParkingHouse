'use strict';

angular.module('myApp').factory('errorMsgService', function () {
    return{
        registration:{
            '1.1': 'username undefined',
            '1.2': 'username length must be 3-20 symbols',
            '1.3': 'username must use characters [a-z, A-Z, 0-9_]',
            '2.1': 'email undefined',
            '2.2': 'email not valid',
            '3.1': 'password undefined',
            '3.2': 'password length must be 6-25 symbols',
            '3.3': 'password must use lower, upper case characters and numbers [0-9]',
            '4.1': 'password confirmation undefined',
            '4.2': 'password and password confirmation must match',
        },
        date:{
            '1.1': 'Start date can be less then stop date!',
        }
    };
});
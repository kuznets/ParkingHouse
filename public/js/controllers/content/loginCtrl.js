'use strict';

angular.module('myApp.login', ['ui.router'])

    .controller('loginCtrl', [
        '$location',
        '$http',
        '$scope',
        '$rootScope',
        '$cookies',
        'errorMsgService',
        function($location, $http, $scope, $rootScope, $cookies, errorMsgService){

            //If user logged in then redirect to root
            if($cookies.get('username') && $cookies.get('token')){
                $location.path('/');
            }

            $scope.url = 'http://localhost:3000/api/';
            var serviceMessages = errorMsgService;
            //Login
            $scope.login = function(){
                //Login fields validation
                console.log('start login process');
                var validMsg = loginFieldsValidation($scope.loginEmail, $scope.loginPwd);
                console.log(validMsg);
                if (Object.keys(validMsg).length != 0) {
                    $scope.error_msg = validMsg;
                    if(validMsg.error_msg.email) {
                        var emailBlock = angular.element(document.querySelector('.email'));
                        emailBlock.addClass('has-danger');
                        var emailInput = emailBlock.find('input');
                        emailInput.addClass('form-control-danger');
                        $scope.err_msg_email = serviceMessages.registration[validMsg.error_msg.email];
                    }
                    if(validMsg.error_msg.password) {
                        var passwordBlock = angular.element(document.querySelector('.password'));
                        passwordBlock.addClass('has-danger');
                        var passwordInput = passwordBlock.find('input');
                        passwordInput.addClass('form-control-danger');
                        $scope.err_msg_password = serviceMessages.registration[validMsg.error_msg.password];
                    }
                } else {
                    $scope.loginUser = {};
                    $scope.loginUser.email = $scope.loginEmail;
                    $scope.loginUser.password = $scope.loginPwd;
                    //Login process
                    $http({
                        method: 'POST',
                        url: $scope.url + 'login',
                        data: $scope.loginUser
                    }).then(function success(res){
                        if(res.data.error_msg) {
                            $scope.error_msg = res.data.error_msg;
                        }
                        if(res.data.message == 'login successful'){
                            if(res.data.token) {
                                $cookies.put('token', res.data.token, { expires: new Date(Date.now() + 1209600000) });
                            }
                            if(res.data.username) {
                                $cookies.put('username', res.data.username, { expires: new Date(Date.now() + 1209600000) });
                                $rootScope.login_username = $cookies.get('username')
                            }
                            $location.path('/index.html');
                        }
                    }), function (err) {
                        console.log('Fail:');
                        console.log(err);
                    }
                }
            }

            //Validate login fields
            function loginFieldsValidation(email, password){
                var data = {};
                var error_msg = {};
                //email
                var email_msg = emailValidation(email);
                if(email_msg != 'ok') {
                    error_msg.email = email_msg;
                }

                //password
                var password_msg = passwordValidation(password);
                if(password_msg != 'ok') {
                    error_msg.password = password_msg;
                }

                if (Object.keys(error_msg).length != 0) {
                    data.error_msg = error_msg;
                }
                return data;
            }

            //Regex email validation.
            function emailValidation(email) {
                if(email == undefined) {
                    //msg: email undefined
                    return '2.1';
                } else {
                    if(!email.match(/.+@.+\..+/i)){
                        //msg: email not valid
                        return '2.2';
                    }
                }
                return 'ok';
            }

            //Regex password validation. Must be 6-25 symbols and use [a-z] and [A-Z] and [0-9] characters
            function passwordValidation(password) {
                if(password == undefined) {
                    //msg: password undefined
                    return '3.1';
                } else {
                    if(password.length < 6 && password.length > 25) {
                        //msg: password length must be 6-25 symbols
                        return '3.2';
                    } else {
                        if(!password.match(/[a-z]/)) {
                            //msg: password must use lower, upper case characters and numbers [0-9]
                            return '3.3';
                        }
                        if(!password.match(/[A-Z]/)) {
                            //msg: password must use lower, upper case characters and numbers [0-9]
                            return '3.3';
                        }
                        if(!password.match(/[0-9]/)) {
                            //msg: password must use lower, upper case characters and numbers [0-9]
                            return '3.3';
                        }
                    }
                }
                return 'ok';
            }
        }
    ])
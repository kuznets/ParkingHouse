'use strict';

angular.module('myApp.registration', ['ui.router'])

    .controller('registrationCtrl', [
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

            // $rootScope.curPath = 'registration';

            $scope.url = 'http://localhost:3000/api/';
            var serviceMessages = errorMsgService;
            //Registration
            $scope.signup = function() {
                //Registration fields validation
                var validMsg = regFieldsValidation($scope.regUsername, $scope.regEmail, $scope.regPwd, $scope.regPwdConf);
                if (Object.keys(validMsg).length != 0) {
                    $scope.error_msg = validMsg;
                    if(validMsg.error_msg.username) {;
                        var usernameBlock = angular.element(document.querySelector('.username'));
                        usernameBlock.addClass('has-danger');
                        var usernameInput = usernameBlock.find('input');
                        usernameInput.addClass('form-control-danger');
                        $scope.err_msg_username = serviceMessages.registration[validMsg.error_msg.username];
                    }
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
                    if(validMsg.error_msg.password_conf) {
                        var passwordConfBlock = angular.element(document.querySelector('.password-conf'));
                        passwordConfBlock.addClass('has-danger');
                        var passwordConfInput = passwordConfBlock.find('input');
                        passwordConfInput.addClass('form-control-danger');
                        $scope.err_msg_password_conf = serviceMessages.registration[validMsg.error_msg.password_conf];
                    }
                    } else {
                    $scope.newUser = {};
                    $scope.newUser.username = $scope.regUsername;
                    $scope.newUser.email = $scope.regEmail;
                    $scope.newUser.password = $scope.regPwd;

                    //Registration process
                    $http({
                        method: 'POST',
                        url: $scope.url + 'registration',
                        data: $scope.newUser
                    }).then(function success(res) {
                        if(res.data.error_msg) {
                            $scope.error_msg = res.data.error_msg;
                        }
                        if(res.data.message == 'registration successful') {
                            if(res.data.token) {
                                $cookies.put('token', res.data.token, { expires: new Date(Date.now() + 1209600000) });
                            }
                            if(res.data.username) {
                                $cookies.put('username', res.data.username, { expires: new Date(Date.now() + 1209600000) });
                            }
                            $location.path('/');
                        }
                    }), function (err) {
                        console.log('Fail:');
                        console.log(err);
                    }
                }
            }

            //Validate registration fields
            function regFieldsValidation(username, email, password, password_conf) {
                var data = {};
                var error_msg = {};
                //username
                var username_msg = usernameValidation(username);
                if(username_msg != 'ok') {
                    error_msg.username = username_msg;
                }

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

                var password_conf_msg = passwordConfValidation(password, password_conf);
                if(password_conf_msg != 'ok') {
                    error_msg.password_conf = password_conf_msg;
                }

                if (Object.keys(error_msg).length != 0) {
                    data.error_msg = error_msg;
                }
                return data;
            }

            //Regex username validation. Must be 3-20 symbols and use [a-zA-Z0-9_] characters
            function usernameValidation(username) {
                //username
                if(username == undefined) {
                    //msg: username undefined
                    return '1.1';
                } else {
                    if(username.length < 4 && username.length > 20) {
                        //msg: username length must be 3-20 symbols
                        return '1.2';
                    } else {
                        if(!username.match(/^\w+$/)) {
                            //msg: username must use characters [a-zA-Z0-9_]
                            return '1.3';
                        }
                    }
                }
                return 'ok';
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

            //Password and password confirmation must match
            function passwordConfValidation(password, password_conf) {
                if(password == undefined) {
                    //msg: password confirmation undefined
                    return '4.1';
                } else {
                    if(password !== password_conf) {
                        //msg: password and password confirmation must match
                        return '4.2';
                    }
                }
                return 'ok';
            }
        }
    ]);
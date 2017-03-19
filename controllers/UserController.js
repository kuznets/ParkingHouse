var db = require(__dirname + '/../db/db.js');
var User = require('../DAO/User');
var bcrypt = require('bcrypt-nodejs');
var JwtOptions = require('../config/jwt_options');
var jwt = require("jwt-simple");

module.exports = function (app) {

    //Registration
    app.post('/api/registration',
        function (req, res) {
            var validMsg = regFieldsValidation(req);
            if (Object.keys(validMsg).length != 0) {
                return res.status(200).send(validMsg);
            }
            User.findOne({
                where: {email: req.body.email}
            })
            .then(function (foundUser) {
                if(foundUser) {
                    return res.status(200).send('That email is already taken.');
                } else {
                    var newUser = {};
                    newUser.username = req.body.username;
                    newUser.email = req.body.email;
                    newUser.password = bcrypt.hashSync(req.body.password);
                    console.log(newUser);
                    User.create(newUser).then(function (user) {
                        var payload = {id: user.id};
                        var token = jwt.encode(payload, JwtOptions.secretOrKey);
                        res.json({message: "registration successful", token: token, username: user.username});
                    });
                }
            });
        });

    //Login
    app.post('/api/login',
        function (req, res) {
            if(req.body.email && req.body.password) {
                var mail = req.body.email;
                var password = req.body.password;
            }
            User.findOne({
                where: {email: mail}
            })
                .then(function (foundUser) {
                    if (!foundUser) {
                        res.status(200).json({message:'no such user found'});
                    }
                    if (!bcrypt.compareSync(password, foundUser.password)){
                        res.status(200).json({message:"passwords did not match"});
                    } else {
                        var payload = {id: foundUser.id};
                        var token = jwt.encode(payload, JwtOptions.secretOrKey);
                        res.json({message: "login successful", token: token, username: foundUser.username});
                    }
                });
        });

    //Validate registration fields
    function regFieldsValidation(req) {
        var data = {};
        var error_msg = {};
        //username
        var username = usernameValidation(req);
        if(username != 'ok') {
            error_msg.username = username;
        }

        //email
        var email = emailValidation(req);
        if(email != 'ok') {
            error_msg.email = email;
        }

        //password
        var password = passwordValidation(req);
        if(password != 'ok') {
            error_msg.password = password;
        }


        if (Object.keys(error_msg).length != 0) {
            data.error_msg = error_msg;
        }
        return data;
    }

    //Validate authorization fields
    function loginFieldsValidation(req) {
        var data = {};
        var error_msg = {};

        //email
        var email = emailValidation(req);
        if(email != 'ok') {
            error_msg.email = email;
        }

        //password
        var password = passwordValidation(req);
        if(password != 'ok') {
            error_msg.password = password;
        }

        if (Object.keys(error_msg).length != 0) {
            data.error_msg = error_msg;
        }
        return data;
    }

    //Regex username validation. Must be 3-20 symbols and use [a-zA-Z0-9_] characters
    function usernameValidation(req) {
        //username
        if(req.body.username == undefined) {
            return 'username undefined';
        } else {
            var x = req.body.username;
            if(x.length < 4 && x.length > 20) {
                return 'username length must be 3-20 symbols';
            } else {
                if(!x.match(/^\w+$/)) {
                    return 'username must use characters [a-zA-Z0-9_]';
                }
            }
        }
        return 'ok';
    }

    //Regex email validation.
    function emailValidation(req) {
        if(req.body.email == undefined) {
            return 'email undefined';
        } else {
            if(!req.body.email.match(/.+@.+\..+/i)){
                return 'email not valid';
            }
        }
        return 'ok';
    }

    //Regex password validation. Must be 6-25 symbols and use [a-z] and [A-Z] and [0-9] characters
    function passwordValidation(req) {
        if(req.body.password == undefined) {
            return 'password undefined';
        } else {
            var x = req.body.password;
            if(x.length < 6 && x.length > 25) {
                return 'password length must be 6-25 symbols';
            } else {
                if(!x.match(/[a-z]/)) {
                    return 'password must use lower, upper case characters and numbers [0-9]';
                }
                if(!x.match(/[A-Z]/)) {
                    return 'password must use lower, upper case characters and numbers [0-9]';
                }
                if(!x.match(/[0-9]/)) {
                    return 'password must use lower, upper case characters and numbers [0-9]';
                }
            }
        }
        return 'ok';
    }


    //Find all users
    // app.get('/api/users', function (req, res) {
    //     var users = User.findAll();
    //     res.send(users);
    // });

    //Find user by username
    // app.get('/api/user/:username', function (req, res) {
    //     var foundUser = User.findOne(req.params.username);
    //     if (!foundUser) {
    //         res.status(404).send('User not found.');
    //     }
    //     res.send(foundUser);
    // });
    //
    // //Login
    // app.post('/api/user/:username/:password', function (req, res) {
    //     console.log('Cookies: ', req.cookies);
    //     if (req.params.username == '' || req.params.password == '') {
    //         return res.sendStatus(401);
    //     }
    //     var foundUser = User.findOne(req.params.username);
    //     if (foundUser) {
    //         for (var key in foundUser) {
    //             if (key == 'password' && foundUser[key] == req.params.password) {
    //                 console.log('Auth done!')
    //                 // return res.send(200);
    //                 var token = foundUser.username + foundUser.password;
    //                 res.cookie('username', foundUser.username,
    //                     {expires: new Date(Date.now() + 1209600000)});
    //                 res.cookie('token', token,
    //                     {expires: new Date(Date.now() + 1209600000)});
    //                 res.sendStatus(200);
    //             }
    //         }
    //     } else {
    //         console.log('Attempt failed to login!')
    //         res.sendStatus(401);
    //     }
    // });

}
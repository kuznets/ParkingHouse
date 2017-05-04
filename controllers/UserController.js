/**
 * The User API
 *
 * routes:
 *  /api/registration
 *  /api/login
 */
'use strict';
const db = require('../config/db.js');
const bcrypt = require('bcrypt-nodejs');
const JwtOptions = require('../config/jwt_options');
const jwt = require("jwt-simple");

exports.create = {};
exports.loginUser = loginUser;
exports.create.registration = registration;

/**
 * Registration
 * POST /api/registration
 * This method create the new user in the database and return authenticate token
 * @method registration
 * @return json {message: 'status information', token: 'authenticate token'}
 */
function registration(req, res) {
    let validMsg = regFieldsValidation(req);
    if (Object.keys(validMsg).length != 0) {
        return res.status(200).send(validMsg);
    }
    db.users.findOne({where: {email: req.body.email}})
        .then(function (foundUser) {
            if (foundUser) {
                return res.status(200).send('That email is already taken.');
            } else {
                let newUser = {};
                newUser.username = req.body.username;
                newUser.email = req.body.email;
                newUser.password = bcrypt.hashSync(req.body.password);
                db.users.create(newUser).then(function (user) {
                    let payload = {id: user.id};
                    let token = jwt.encode(payload, JwtOptions.secretOrKey);
                    res.json({message: "registration successful", token: token, username: user.username});
                });
            }
        });
}

/**
 * Login
 * GET /api/login
 * This method check the email and password in the database and return authenticate token and username
 * @method loginUser
 * @return json {message: 'status information', token: 'authenticate token', username}
 */
function loginUser(req, res) {
    let validMsg = loginFieldsValidation(req);
    if (Object.keys(validMsg).length != 0) {
        return res.status(200).send(validMsg);
    }
    db.users.findOne({where: {email: req.body.email}})
        .then(function (foundUser) {
            if (!foundUser) {
                res.status(200).json({message: 'no such user found'});
            }
            if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
                res.status(200).json({message: "passwords did not match"});
            } else {
                let payload = {id: foundUser.id};
                let token = jwt.encode(payload, JwtOptions.secretOrKey);
                res.json({message: "login successful", token: token, username: foundUser.username});
            }
        });
}

/**
 * This method validate registration fields and return validate status
 * @method regFieldsValidation
 * @param req
 * @return {{}} - validate status
 */
function regFieldsValidation(req) {
    let data = {};
    let error_msg = {};
    //username
    let username = usernameValidation(req);
    if (username != 'ok') {
        error_msg.username = username;
    }

    //email
    let email = emailValidation(req);
    if (email != 'ok') {
        error_msg.email = email;
    }

    //password
    let password = passwordValidation(req);
    if (password != 'ok') {
        error_msg.password = password;
    }


    if (Object.keys(error_msg).length != 0) {
        data.error_msg = error_msg;
    }
    return data;
}

/**
 * This method validate authorization fields and return validate status
 * @method loginFieldsValidation
 * @param req
 * @return {{}} - validate status
 */
function loginFieldsValidation(req) {
    let data = {};
    let error_msg = {};

    //email
    let email = emailValidation(req);
    if (email != 'ok') {
        error_msg.email = email;
    }

    //password
    let password = passwordValidation(req);
    if (password != 'ok') {
        error_msg.password = password;
    }

    if (Object.keys(error_msg).length != 0) {
        data.error_msg = error_msg;
    }
    return data;
}

/**
 * Regex username field validation. Must be 3-20 symbols and use [a-zA-Z0-9_] characters
 * @method usernameValidation
 * @param req
 * @return {*} - validation status
 */
function usernameValidation(req) {
    if (req.body.username == undefined) {
        return 'username undefined';
    } else {
        let x = req.body.username;
        if (x.length < 4 && x.length > 20) {
            return 'username length must be 3-20 symbols';
        } else {
            if (!x.match(/^\w+$/)) {
                return 'username must use characters [a-zA-Z0-9_]';
            }
        }
    }
    return 'ok';
}

/**
 * Regex email field validation.
 * @method emailValidation
 * @param req
 * @return {*} - validation status
 */
function emailValidation(req) {
    if (req.body.email == undefined) {
        return 'email undefined';
    } else {
        if (!req.body.email.match(/.+@.+\..+/i)) {
            return 'email not valid';
        }
    }
    return 'ok';
}

/**
 * Regex password validation. Must be 6-25 symbols and use [a-z] and [A-Z] and [0-9] characters
 * @method passwordValidation
 * @param req
 * @return {*} - validation status
 */
function passwordValidation(req) {
    if (req.body.password == undefined) {
        return 'password undefined';
    } else {
        let x = req.body.password;
        if (x.length < 6 && x.length > 25) {
            return 'password length must be 6-25 symbols';
        } else {
            if (!x.match(/[a-z]/)) {
                return 'password must use lower, upper case characters and numbers [0-9]';
            }
            if (!x.match(/[A-Z]/)) {
                return 'password must use lower, upper case characters and numbers [0-9]';
            }
            if (!x.match(/[0-9]/)) {
                return 'password must use lower, upper case characters and numbers [0-9]';
            }
        }
    }
    return 'ok';
}
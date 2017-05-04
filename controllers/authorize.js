'use strict';

/**
 * @method authorize
 *
 * @description
 * Provides the token check.
 * Method get the token, decode it
 * if result is true return decoded object
 * if result is false return error message
 */
module.exports = function(token) {

    const jwt = require("jwt-simple");
    const JwtOptions = require('../config/jwt_options');

    let promise = new Promise(function (resolve, reject) {
        let decoded = jwt.decode(token, JwtOptions.secretKey);
        if(decoded) {
            resolve(decoded);
        } else {
            reject('Token is wrong');
        }
    });
    return promise;
}
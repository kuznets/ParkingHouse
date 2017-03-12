var passport = require('passport');
var passportJWT = require('passport-jwt');
var JwtStrategy = passportJWT.Strategy;
var ExtractJwt = passportJWT.ExtractJwt;
var User = require('../DAO/User');
var JwtOptions = require('./jwt_options');

module.exports = function () {
    var strategy = new JwtStrategy(JwtOptions, function(jwt_payload, next) {
        console.log('payload received', jwt_payload);
        User.findOne({
            where: {'email': jwt_payload.email}
        }).then(function (user) {
            if (user) {
                next(null, user);
            } else {
                next(null, false);
            }
        });
    });
    passport.use(strategy);

    // return {
    //     initialize: function () {
    //         return passport.initialize();
    //     },
    //     authenticate: function () {
    //         return passport.authenticate('jwt', mySecret.jwtSession);
    //     }
    // };
};
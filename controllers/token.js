var passport = require('passport');
var JwtOptions = require('../config/jwt_options');

module.exports = function (app) {
    
    app.get('/api/token', passport.authenticate('jwt', JwtOptions.JwtSession),
        function (req, res) {
            res.json("Success! You can not see this without a token");
    })
}
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;

module.exports = {
    secretOrKey: 'db11297b05260072691d946b50a84ce9ef566e33a5d6c8619e3ae63ef17acddf',
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    JwtSession: {
        session: false
    }
};
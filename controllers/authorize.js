var db = require(__dirname + '/../db/db.js');
var User = require(__dirname + '/../DAO/User.js');

module.exports = function (req) {
    if (!req.cookies.username || !req.cookies.token) {
        return false;
    } else {
        var foundUser = User.findOne(req.cookies.username);
        if (foundUser) {
            var userToken = foundUser.username + foundUser.password;
            if (req.cookies.token == userToken) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
}
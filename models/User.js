var db = require(__dirname + '/../db/db.js');

exports.findAll = function () {
    var query = db.users;
    return query;
}

exports.findOne = function (username) {
    var userList = db.users;
    var foundUser;
    userList.forEach(function (item, i, arr) {
        for (key in item) {
            if (key == 'username' && item[key] == username) {
                foundUser = item;
                break;
            }
        }
    });
    return foundUser;
}
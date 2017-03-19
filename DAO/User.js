var Sequelize = require('sequelize');
var sequelize = require('../config/db');

var userSchema = {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}

module.exports = sequelize().define('users', userSchema);



// var db = require(__dirname + '/../db/db.js');
//
// exports.findAll = function () {
//     var query = db.users;
//     return query;
// }
//
// exports.findOne = function (username) {
//     var userList = db.users;
//     var foundUser;
//     userList.forEach(function (item, i, arr) {
//         for (var key in item) {
//             if (key == 'username' && item[key] == username) {
//                 foundUser = item;
//                 break;
//             }
//         }
//     });
//     return foundUser;
// }
//
// exports.getUserRole = function (username) {
//     var userList = db.users;
//     var foundRole;
//     userList.forEach(function (item, i, arr) {
//         if ( item.username == username) {
//             foundRole = item.role;
//         }
//     });
//     return foundRole;
// }
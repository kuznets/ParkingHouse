var Sequelize = require('sequelize');
var sequelize = require('../config/db');

module.exports = sequelize().define('users', {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    token: Sequelize.STRING
});



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
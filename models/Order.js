var db = require(__dirname + '/../db/db.js');

exports.findAll = function() {
    var query = db.orders;
    return query;
}

exports.findOne = function(id) {
    var orderList = db.orders;
    var foundOrders;
    orderList.forEach(function (item, i, arr) {
        for (key in item) {
            if (key == 'id' && item[key] == id) {
                foundOrders = item;
                break;
            }
        }
    });
    return foundOrders;
}

exports.findByUsername = function(username) {
    var orderList = db.orders;
    var foundOrders= [];
    orderList.forEach(function (item, i, arr) {
        for (key in item) {
            if (key == 'username' && item[key] == username) {

                foundOrders.push(item);
            }
        }
    });
    return foundOrders;
}









// var order = {
//
//     findAll: function () {
//         var query = db.orders;
//         return query;
//     },
//
//     findOne: function (id) {
//         var orderList = db.orders;
//         var foundOrders;
//         orderList.forEach(function (item, i, arr) {
//             for (key in item) {
//                 if (key == 'id' && item[key] == id) {
//                     foundOrders = item;
//                     break;
//                 }
//             }
//         });
//         return foundOrders;
//     }
// }
//
// module.exports = order;
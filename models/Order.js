var db = require(__dirname + '/../db/db.js');

exports.findAll = function() {
    var query = db.orders;
    return query;
}

exports.findOne = function(id) {
    var orderList = db.orders;
    var foundOrders;
    orderList.forEach(function (item, i, arr) {
        for (var key in item) {
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
        if (item.username == username) {
            foundOrders.push(item);
        }
    });
    return foundOrders;
}

//Add new order
exports.addOrder = function (order) {
    db.orders.push(order);
}
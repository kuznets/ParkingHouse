var bodyParser = require('body-parser');
var db = require(__dirname + '/../db/db.js');
var Order = require(__dirname + '/../models/Order.js');
var authorize = require(__dirname + '/authorize.js');

module.exports = function (app) {
    //Find one order
    app.get('/api/order/:id', function (req, res) {
        var foundUser = authorize(req);
        if (foundUser) {
            var foundOrder = Order.findOne(req.params.id);
            if (!foundUser) {
                res.status(404).send('Order not found.');
            }
            res.send(foundOrder);
        } else {
            res.sendStatus(401);
        }
    });

    //Find all orders by username
    app.get('/api/orders', function (req, res) {
        var foundUser = authorize(req);
        if (foundUser) {
            var userOrders = Order.findByUsername(req.cookies.username);
            if (userOrders.length > 0) {
                res.send(userOrders);
            } else {
                res.status(404).send('Orders not found.');
            }
        } else {
            res.sendStatus(401);
        }
    });

    //Add Order
    app.get('/api/order', function (req, res) {
        var foundUser = authorize(req);
        if (foundUser) {
            var dt = new Date();
            var dateStart = setDateNow(dt);
            console.log(setDateNow(dt));
            res.send(200);
        }
    });

    function setDateNow(dt) {
        var year = dt.getFullYear();
        var month = dt.getMonth();
        var day = dt.getDay();
        var hour = dt.getHours();
        var min = dt.getMinutes();
        var sek = dt.getSeconds();
        return year+ '.' + month + '.' + day + ' ' + hour + ':' + min + ':' + sek;
    }

}
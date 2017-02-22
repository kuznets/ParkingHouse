var bodyParser = require('body-parser');
var db = require(__dirname + '/../db/db.js');
var Order = require(__dirname + '/../models/Order.js');
var User = require(__dirname + '/../models/User.js');
var authorize = require(__dirname + '/authorize.js');
var orderBuilder = require(__dirname + '/orderBuilder.js');

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
    // app.post('/api/order', function (req, res) {
    //     var foundUser = authorize(req);
    //     if (foundUser) {
    //         var user = User.findOne(req.body.username);
    //         if (!user) {
    //             res.status(404).send('User not found.');
    //         }
    //
    //         var buildOrders = orderBuilder.getOrders(req.body.start_date, req.body.stop_date, user.username);
    //         if (buildOrders) {
    //             var userOrders = Order.findByUsername(req.cookies.username);
    //             if (userOrders.length > 0) {
    //                 res.send(userOrders);
    //             } else {
    //                 res.status(404).send('Orders not found.');
    //             }
    //         } else {
    //             res.sendStatus(401);
    //         }
    //     }
    // });

}
/**
 * The Order API
 *
 * routes:
 *  /api/orders
 */
'use strict';
const bodyParser = require('body-parser');
const db = require('../config/db.js');

exports.create = {};

exports.getAllOrders = getAllOrders;
exports.create.addNewOrder = addNewOrder;

/**
 * GET /api/orders
 * Return all user orders from db.
 * @method getAllOrders
 * @return json {message: 'status information', body: 'object of orders'}
 */
function getAllOrders(req, res, next) {
    if (!req.decoded) {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
    db.orders.findAll({where: {userId: req.decoded.id}})
        .then(function (orders) {
            let ordersList = [];
            orders.forEach(function (item, i, arr) {
                let order = {};
                order.id = item['id'];
                order.startDate = item['startDate'];
                order.stopDate = item['stopDate'];
                order.price = item['price'];
                order.totalPrice = item['totalPrice'];
                ordersList.push(order);
            });
            res.json({message: 'OK', body: ordersList});
        })
        .catch(function (err) {
            res.status(200).send('User not found');
            next();
        });
}

/**
 * POST /api/order
 * Get order data from client and add new order to db. Then return all orders by user id.
 * @method addNewOrder
 * @return json {message: 'status information'}
 */
function addNewOrder(req, res, next) {
    if (!req.decoded) {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
    let newOrder = {};
    newOrder.startDate = req.body.startDate;
    newOrder.stopDate = req.body.stopDate;
    let parkPriceRate = 1;
    newOrder.price = parkPriceRate;
    //Get total minutes
    let parkTotalMin = (req.body.stopDate - req.body.startDate) / 1000 / 60;
    //Get the number of periods of 30 minutes
    let parkRegPeriod = parkTotalMin / 30;
    parkRegPeriod = Math.round(parkRegPeriod); //Issue: if example parking = 5min, then rounds to zero.
    newOrder.totalPrice = parkRegPeriod * parkPriceRate;
    newOrder.userId = req.decoded.id;
    db.orders.create(newOrder).then(function (order) {
        //Get all orders
        db.orders.findAll({where: {userId: req.decoded.id}})
            .then(function (orders) {
                let ordersList = [];
                orders.forEach(function (item, i, arr) {
                    let order = {};
                    order.id = item['id'];
                    order.startDate = item['startDate'];
                    order.stopDate = item['stopDate'];
                    order.price = item['price'];
                    order.totalPrice = item['totalPrice'];
                    ordersList.push(order);
                });
                //console.log('all arders after create new: ', ordersList);
                res.json({message: 'order added', body: ordersList});
            })
            .catch(function (err) {
                res.status(200).send('User not found');
            });
    }).catch(function (err) {
        res.status(200).send('Order not created');
        next();
    });
}
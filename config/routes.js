'use strict';

const authorize = require('../controllers/authorize.js');

/**
 * @overview routes
 * Application Routing
 *
 * This file initializes the links between route controllers and the express
 * HTTP server.
 */
const user = require('../controllers/UserController');
const order = require('../controllers/OrderController');
//const invoice = require('../controllers/InvoiceController.js');

// expose routes to the server.
exports.configure = function configure(app) {

    // ---------------------------------------------------------
    // authentication (no middleware necessary since this inst authenticated)
    // ---------------------------------------------------------
    app.post('/api/login', user.loginUser);
    app.post('/api/registration', user.create.registration);

    // ---------------------------------------------------------
    // route middleware to authenticate and check token
    // ---------------------------------------------------------
    app.use(function (req, res, next) {
        // check header or url parameters or post parameters for token
        let token = req.cookies.token;

        if (token) {
            //console.log('start auth ------------------------');
            authorize(token)
                .then(function (decoded) {
                    //console.log('auth done ------------------------', decoded);
                    req.decoded = decoded;
                    next();
                })
                .catch(function (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

    // ---------------------------------------------------------
    // authenticated routes
    // ---------------------------------------------------------
    // Orders API
    app.get('/api/orders', order.getAllOrders);
    // app.get('/api/order/:id', order.order);
    app.post('/api/order', order.create.addNewOrder);

    // Invoices API
    // app.get('/api/invoices', order.invoices);
    // app.get('/api/invoice/:id', order.invoice);
    // app.post('/api/invoice', order.create.invoice);

}
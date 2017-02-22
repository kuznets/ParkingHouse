delete process.env["DEBUG_FD"];
var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

var port = process.env.PORT || 3000;

var app  = express();

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send(path.join(__dirname + '/public/index.html'));
});

var userController = require(__dirname + '/controllers/UserController.js')(app);
var orderController = require(__dirname + '/controllers/OrderController.js')(app);
var invoiceController = require(__dirname + '/controllers/InvoiceController.js')(app);

// log to console
app.use(morgan('dev'));

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    res.status(500);
    res.end(err.message);
}

// START THE SERVER
// =============================================================================
app.listen(port, function () {
    console.log('App is listening on port ' + port);
});

module.exports = app;
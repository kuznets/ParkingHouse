delete process.env["DEBUG_FD"];
var express = require('express');
var path = require('path');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var passport = require('passport');
var jwt = require('jwt-simple');
var auth = require('./config/auth')();

var port = process.env.PORT || 3000;

var app  = express();

// log to console
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'))

app.use(passport.initialize());

app.get('/', function (req, res) {
    res.send(path.join(__dirname + '/public/index.html'));
});

var token = require(__dirname + '/controllers/token.js')(app);
var userController = require(__dirname + '/controllers/UserController.js')(app);
var orderController = require(__dirname + '/controllers/OrderController.js')(app);
var invoiceController = require(__dirname + '/controllers/InvoiceController.js')(app);


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
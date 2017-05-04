delete process.env["DEBUG_FD"];
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const jwt = require('jwt-simple');

const port = process.env.PORT || 3000;

const app  = express();

// log to console
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'))

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// basic route (http://localhost:3000)
app.get('/', function (req, res) {
    res.send(path.join(__dirname + '/public/index.html'));
});

// ---------------------------------------------------------
// Routes
// ---------------------------------------------------------
require('./config/routes').configure(app);

app.get('*', function (req,res) {
    res.render('./index.html');
});

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
var db = require(__dirname + '/../db/db.js');
var Invoices = require(__dirname + '/../DAO/Invoice.js');
var authorize = require(__dirname + '/authorize.js');

module.exports = function (app) {
    //Find all invoices by username
    app.get('/api/invoices', function (req, res) {
        var foundUser = authorize(req);
        if (foundUser) {
            if (Invoices.generateInvoice(req.cookies.username)){
                var userInvoices = Invoices.findAllByUsername(req.cookies.username);
                if (userInvoices.length > 0) {
                    res.send(userInvoices);
                } else {
                    res.status(404).send('Invoices not found.');
                }
            } else {
                res.status(404).send('Invoices not found.');
            }
        } else {
            res.sendStatus(401);
        }
    });

    //Find one invoice by id
    app.get('/api/invoice/:id', function (req, res) {
        var foundUser = authorize(req);
        if (foundUser) {
            var foundInvoice = Invoices.findOne(req.params.id, req.cookies.username);
            if (foundInvoice.length > 0) {
                res.send(foundInvoice);
            } else {
                res.status(404).send('Invoice not found.');
            }
        } else {
            res.sendStatus(401);
        }
    });
}
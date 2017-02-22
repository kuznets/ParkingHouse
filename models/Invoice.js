var db = require(__dirname + '/../db/db.js');
var Order = require(__dirname + '/../models/Order.js');
var User = require(__dirname + '/../models/User.js');

exports.findAllByUsername = function (username) {
    var invoiceList = db.invoices;
    var foundInvoices = [];
    invoiceList.forEach(function (item, i, arr) {
        if (item.username == username) {
            foundInvoices.push(item);
        }
    });
    return foundInvoices;
}

exports.findOne = function (id, username) {
    var invoiceList = db.invoices;
    var foundInvoice = [];
    invoiceList.forEach(function (item, i, arr) {
        if (item.id == id && item.username == username) {
            foundInvoice.push(item);
        }
    });
    return foundInvoice;
}

exports.generateInvoice = function (username) {
    var db1 = db.invoices;
    //Invoice
    //id
    var id = getInvoiceLastId();
    if (id > 0) {
        id++;
    } else {
        id = 1;
    }
    //Get user role
    var role = User.getUserRole(username);
    //Get the beginning and the end of the month
    //var date = dataViewBuilder();
    var startDate = new Date();//date
    var nowMonth = startDate.getMonth();
    var nowYear = startDate.getFullYear();
    startDate = new Date(nowYear, nowMonth);//date
    var endDate = new Date();//date
    endDate = new Date(nowYear, nowMonth, getLastDayOfMonth(nowYear, nowMonth), 23, 59);//date
    startDate = startDate.getTime();//ms
    endDate = endDate.getTime();//ms
    //Get users orders for dates
    var userOrders = [];
    userOrders = getUserOrdersListForMonth(username, startDate, endDate);
    //Get invoice fee amount
    var total = totalPriceForMonth(username, userOrders);
    var haveInvoice = findThisMonthInvoice(startDate, endDate, username);
    if (haveInvoice) {
        id = getInvoiceLastId(username);
        editInvoice(id, total, userOrders);
    } else {
        createInvoice(id, username, role, startDate, endDate, total, userOrders);
    }
    var db2 = db.invoices;
    return true;
}

function findThisMonthInvoice(startDate, endDate, username) {
    var invoices = db.invoices;
    var res;
    for (var i = 0; i < invoices.length; i++) {
        if (invoices[i].start_date <= startDate && invoices[i].stop_date >= endDate && invoices[i].username == username) {
            return res = true;
        }
    }
    return res = false;
}

    function getUserOrdersListForMonth(username, startDate, endDate) {
        var ordersList = Order.findByUsername(username);
        var userOrders = [];
        ordersList.forEach(function (item, i, arr) {
            if (item.start_date >= startDate && item.stop_date <= endDate) {
                userOrders.push(item);
            }
        });
        return userOrders;
    }

    function getInvoiceLastId(username) {
        var lastId;
        db.invoices.forEach(function (item, i, arr) {
            if (item.username == username) {
                lastId = item.id;
            } else {
                lastId = item.id;
            }
        });
        return lastId;
    }

    function totalPriceForMonth(username, userOrders) {
        var user = User.findOne(username);
        var totalPrice = 0;
        userOrders.forEach(function (item, i, arr) {
            totalPrice = totalPrice + parseInt(item.total_price);
        });
        if (user.role == "Premium") {
            totalPrice = totalPrice + 20;
            if (totalPrice > 300) {
                totalPrice = 300;
            }
        }
        return totalPrice;
    }

    function getLastDayOfMonth(year, month) {
        var date = new Date(year, month + 1, 0);
        return date.getDate();
    }

    function createInvoice(id, username, role, startDate, endDate, total, userOrders) {
        var newInvoice = {};
        newInvoice.id = id;
        newInvoice.username = username;
        newInvoice.role = role;
        newInvoice.start_date = startDate;
        newInvoice.stop_date = endDate;
        newInvoice.total = total;
        newInvoice.orders = userOrders;
        db.invoices.push(newInvoice);
    }

    function editInvoice(id, total, userOrders) {
        var invoice = db.invoices;
        invoice.forEach(function (item, i, arr) {
            if (item.id == id) {
                item.id = id;
                item.username = item.username;
                item.role = item.role;
                item.start_date = item.start_date;
                item.stop_date = item.stop_date;
                item.total = total;
                item.orders = userOrders;
            }
        });
    }

    function dataViewBuilder() {
        var nowDate = new Date();
        var nowYear = nowDate.getFullYear();
        var nowMonth = addZero(nowDate.getMonth());
        var lastDayOfMonth = getLastDayOfMonth(nowYear, nowMonth);
        var startDate = new Date(nowYear, nowMonth, 1);
        var endDate = new Date(nowYear, nowMonth, lastDayOfMonth);
        var getStartDay = addZero(startDate.getDate());
        var getEndDay = addZero(endDate.getDate());
        var date = getStartDay + '.' + nowMonth + '.' + nowYear + ' - ' +
            getEndDay + '.' + nowMonth + '.' + nowYear;
        return date;
    }

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
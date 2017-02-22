var users = exports.users = [];
users.push({ id: '1', username: 'Regular', password: 'user', role: 'Regular' });
users.push({ id: '2', username: 'Premium', password: 'user', role: 'Premium' });

var prices = exports.prices = [];
prices.push({id: '1', role: 'Regular', rate: 'day-time', price: '1,50'});
prices.push({id: '2', role: 'Regular', rate: 'night-time', price: '1,00'});
prices.push({id: '3', role: 'Premium', rate: 'day-time', price: '1,00'});
prices.push({id: '4', role: 'Premium', rate: 'night-time', price: '0,75'});
prices.push({id: '5', role: 'Regular', rate: 'month', price: '0,00'});
prices.push({id: '6', role: 'Premium', rate: 'month', price: '20,00'});

var orders = exports.orders = [];
orders.push({ id: '1', username: 'Regular', start_date: '1487139120000', stop_date: '1487148300000', role: 'Regular', price: '1,50', total_price: '9,00' });
orders.push({ id: '2', username: 'Regular', start_date: '1487180400000', stop_date: '1487183400000', role: 'Regular', price: '1,00', total_price: '2,00' });
orders.push({ id: '3', username: 'Premium', start_date: '1487139120000', stop_date: '1487148300000', role: 'Premium', price: '1,00', total_price: '6,00' });
orders.push({ id: '4', username: 'Premium', start_date: '1487134920000', stop_date: '1487152560000', role: 'Premium', price: '1,00', total_price: '10,00' });
orders.push({ id: '5', username: 'Premium', start_date: '1487190900000', stop_date: '1487190900000', role: 'Premium', price: '0,75', total_price: '0,75' });
orders.push({ id: '6', username: 'Premium', start_date: '1487180400000', stop_date: '1487183400000', role: 'Premium', price: '0,75', total_price: '1,50' });

var invoices = exports.invoices = [];
invoices.push({ id: '1', username: 'Regular', role: 'Regular', start_date: '1485900000000', stop_date: '1488319140000', total: '9,00',  orders: [1, 2]});

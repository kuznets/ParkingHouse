var users = exports.users = [];

users.push({ id: '1', username: 'Regular', password: 'user', role: 'Regular' });
users.push({ id: '2', username: 'Premium', password: 'user', role: 'Premium' });

var prices = exports.prices = [];
prices.push({id: '1', role: 'Regilar', rate: 'am', price: '1,50'});
prices.push({id: '2', role: 'Regilar', rate: 'pm', price: '1,00'});
prices.push({id: '3', role: 'Premium', rate: 'am', price: '1,00'});
prices.push({id: '4', role: 'Premium', rate: 'pm', price: '0,75'});
prices.push({id: '5', role: 'Regular', rate: 'month', price: '0,00'});
prices.push({id: '6', role: 'Premium', rate: 'month', price: '20,00'});

var orders = exports.orders = [];
orders.push({ id: '1', username: 'Regular', start_park: '08:12', stop_park: '10:45', role: 'Regular', price: '1,50', total_price: '9,00' });
orders.push({ id: '2', username: 'Regular', start_park: '19:40', stop_park: '20:35', role: 'Regular', price: '1,00', total_price: '2,00' });
orders.push({ id: '3', username: 'Premium', start_park: '08:12', stop_park: '10:45', role: 'Premium', price: '1,00', total_price: '6,00' });
orders.push({ id: '4', username: 'Premium', start_park: '07:02', stop_park: '11:56', role: 'Premium', price: '1,00', total_price: '10,00' });
orders.push({ id: '5', username: 'Premium', start_park: '22:10', stop_park: '22:35', role: 'Premium', price: '0,75', total_price: '0,75' });
orders.push({ id: '6', username: 'Premium', start_park: '19:40', stop_park: '20:30', role: 'Premium', price: '0,75', total_price: '1,50' });

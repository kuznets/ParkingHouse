const Sequelize = require('sequelize');
const sequelize = new Sequelize('parking_house', 'pguser', '12345',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        max: 100,
        idleTimeoutMillis: 30000,
    });

let db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models
db.users = require('../DAO/User.js')(sequelize, Sequelize);
db.orders = require('../DAO/Order.js')(sequelize, Sequelize);

//Relations
db.orders.belongsTo(db.users);
db.users.hasMany(db.orders);

module.exports = db;
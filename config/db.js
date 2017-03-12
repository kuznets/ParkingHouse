var Sequelize = require('sequelize');
var sequelize = new Sequelize('parking_house', 'pguser', '12345',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432

    });

module.exports = function() {
    return sequelize;
}
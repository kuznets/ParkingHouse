var sequelize = require('./db');
var User = require('../DAO/User');

User.sync({force: true}).then(process.exit);
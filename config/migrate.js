var sequelize = require('./db');
var User = require('../models/User');

User.sync({force: true}).then(process.exit);
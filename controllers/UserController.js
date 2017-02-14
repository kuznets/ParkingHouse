var bodyParser = require('body-parser');
var db = require(__dirname + '/../db/db.js');
var User = require(__dirname + '/../models/User.js');

module.exports = function (app) {
    //Find all users
    // app.get('/api/users', function (req, res) {
    //     var users = User.findAll();
    //     res.send(users);
    // });

    //Find user by username
    app.get('/api/user/:username', function (req, res) {
        var foundUser = User.findOne(req.params.username);
        if (!foundUser) {
            res.status(404).send('User not found.');
        }
        res.send(foundUser);
    });

    //Login
    app.post('/api/user/:username/:password', function (req, res) {
        console.log('Cookies: ', req.cookies);
        if (req.params.username == '' || req.params.password == '') {
            return res.sendStatus(401);
        }
        var foundUser = User.findOne(req.params.username);
        if (foundUser) {
            for (key in foundUser) {
                if (key == 'password' && foundUser[key] == req.params.password) {
                    console.log('Auth done!')
                    // return res.send(200);
                    var token = foundUser.username + foundUser.password;
                    res.cookie('username', foundUser.username,
                        {expires: new Date(Date.now() + 1209600000)});
                    res.cookie('token', token,
                        {expires: new Date(Date.now() + 1209600000)});
                    res.sendStatus(200);
                }
            }
        } else {
            console.log('Attempt failed to login!')
            res.sendStatus(401);
        }
    });

}
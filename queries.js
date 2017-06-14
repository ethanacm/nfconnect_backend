/**
 * Created by EthanCasselMace on 5/18/17.
 */


var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
// psql configuration options. TODO hide these somewhere else
var config = {
    host: 'localhost',
    port: 5432,
    database: 'mydb',
    user: 'casselmacee',
    password: process.env.PSQL_PASSWORD
};

var db = pgp(config);

// returns all users in database
function getAllUsers(req, res, next) {
    db.any('select * from nfconnect.user')
        .then(function (data) {
        res.status(200)
            .json({
                status: 'success',
                data: data,
                message: 'retrieved all users'
            });
    })
        .catch(function (err) {
            return next(err)
        });
}


//adds a new user to the database
function addUser(req, res, next) {
    console.log(req.body);
    db.none('insert into nfconnect.user( first_name, last_name, email, password, phone_number, potential_driver)'+
    'values( ${first_name}, ${last_name}, ${email}, ${password}, ${phone_number}, ${potential_driver})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'added one user.'
                });
        })
        .catch(function (err) {
            return next(err)
        });
}





module.exports = {
    getAllUsers: getAllUsers,
    addUser: addUser
};
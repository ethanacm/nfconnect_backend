var express = require('express');
var router = express.Router();
var queries = require('../queries');

// GET users listing.
router.get('/all_users', queries.getAllUsers);
// POST new user.
router.post('/add_user', queries.addUser);
// GET new user by id
router.post('/add_user', queries.addUser);


/*
router.get('/maddie', function(req, res, next) {
    res.render('m', {});
});
*/

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Jellyfish Ninja' });
});

router.get('/attempt_login', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;

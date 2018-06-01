var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    req.logOut();
    req.session.destroy(function (err) {
        res.redirect('/'); //Inside a callback… bulletproof!
    });
});


module.exports = router;

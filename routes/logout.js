var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
   req.logout();
   req.session.destroy();
    res.redirect('/');
});


module.exports = router;

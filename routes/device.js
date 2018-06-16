var express = require('express');
var router = express.Router();
var authenticationMiddleware = require('../auth/authMiddlewares').authenticationMiddleware;

router.get('/', authenticationMiddleware,function(req, res, next) {
    res.render('device');
});

module.exports = router;

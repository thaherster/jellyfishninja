var express = require('express');
var router = express.Router();
var firebase = require('firebase/app'); require('firebase/auth');
var authenticationMiddleware = require('../auth/authMiddlewares').authenticationMiddleware;

router.get('/', authenticationMiddleware,function(req, res, next) {
    console.log("DASH "+req.user);

           return res.render('notifications',
               {
                   user:req.user
               });
});

module.exports = router;

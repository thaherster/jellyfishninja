var express = require('express');
var router = express.Router();
var firebase = require('firebase/app'); require('firebase/auth');

router.get('/', authenticationMiddleware,function(req, res, next) {

           return res.render('upgrade',
               { title: 'Jellyfish Ninja',
                   user:req.user.uid,
                   useremail:req.user.email
               });
});

function authenticationMiddleware (req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
}


module.exports = router;

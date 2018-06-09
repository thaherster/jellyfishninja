var express = require('express');
var router = express.Router();
var firebase = require('firebase/app');  require('firebase/database');

router.get('/', authenticationMiddleware,function(req, res, next) {

    console.log("DASH "+req.user.uid);
    console.log("DASH "+req.user.email);
    console.log("DASH "+req.isAuthenticated());

           return res.render('dashboard',
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

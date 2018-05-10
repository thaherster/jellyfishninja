var express = require('express');
var router = express.Router();
var firebase = require('firebase/app'); require('firebase/auth');

router.get('/', isAuthenticated,function(req, res, next) {

    var user = firebase.auth().currentUser;
           return res.render('dashboard',
               { title: 'Jellyfish Ninja',
                   useremail:user.email
               });
});

function isAuthenticated(req, res, next) {

    var user = firebase.auth().currentUser;

    if (user) {
        // User is signed in.
        return next();

    } else {
        // No user is signed in.
        res.redirect('/login');
    }
}


module.exports = router;

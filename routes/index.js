var express = require('express');
var router = express.Router();
var firebase = require('firebase/app'); require('firebase/auth');
var mw = require('./my-middleware.js').is;
/* GET home page. */
router.get('/',function(req, res, next) {

    return res.render('index', { title: 'Jellyfish Ninja' });

});

function isAuthenticated(req, res, next) {

    var user = firebase.auth().currentUser;

    if (user) {
        // User is signed in.
        res.redirect('/dashboard');


    } else {
        // No user is signed in.
         next();
    }
}


module.exports = router;

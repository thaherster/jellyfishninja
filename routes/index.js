var express = require('express');
var router = express.Router();
var firebase = require('firebase/app'); require('firebase/auth');

/* GET home page. */
router.get('/', function(req, res, next) {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
           return res.redirect('/dashboard');
        } else {
            return res.render('index', { title: 'Jellyfish Ninja' });

        }
    });
});



module.exports = router;

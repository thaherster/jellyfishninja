var express = require('express');
var router = express.Router();
var firebase = require('firebase/app'); require('firebase/auth'); require('firebase/database');
var qr = require('qr-image');
router.get('/',isAuthenticated, function(req, res, next) {
    var user = firebase.auth().currentUser.uid;
    var code = qr.image("jellyfish.ninja/"+user, { type: 'png', ec_level: 'H', size: 5, margin: 0 });
    res.setHeader('Content-type', 'image/png');
    code.pipe(res);

});


function isAuthenticated(req, res, next) {

    var user = firebase.auth().currentUser;

    if (user) {
        // User is signed in.
        return next();


    } else {
        // No user is signed in.
        res.redirect('/');

    }
}

module.exports = router;

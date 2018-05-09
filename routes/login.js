var express = require('express');
var router = express.Router();
var check = require('express-validator/check').check;
var validationResult = require('express-validator/check').validationResult;
var matchedData = require('express-validator/filter').matchedData;
var firebase = require('firebase/app'); require('firebase/auth');




router.get('/',isAuthenticated, function(req, res, next) {
        res.render('login', { title: 'Jellyfish Ninja',
            data:{},
            errors:{},
            errorMessage:" "
        });
});



router.post('/', [
    check('email')
        .isEmail()
        .withMessage('Not an email')
        .trim()
        .normalizeEmail(),
    check('password')
        .isLength({min:6})
        .withMessage(' min 6')
        .trim()
],function(req, res, next) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('login', {
            title: 'Jellyfish Ninja',
            data: req.body,
            errors: errors.mapped(),
            errorMessage:" "
        });
    }

    const data = matchedData(req);
    console.log('Sanitized:', data);
    // req.flash('success', 'Valid data :'+data.email +" "+data.password);

    firebase.auth().signInWithEmailAndPassword(data.email, data.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Login  "+errorMessage);
        return res.render('login', {
            title: 'Jellyfish Ninja',
            data: req.body,
            errors:{},
            errorMessage:errorMessage
        });

    });

   firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

            return res.redirect('/dashboard');
        }
    });

});



function isAuthenticated(req, res, next) {

    var user = firebase.auth().currentUser;

    if (user) {
        // User is signed in.
        res.redirect('/dashboard');


    } else {
        // No user is signed in.
        return next();
    }
}

module.exports = router;

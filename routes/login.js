var express = require('express');
var router = express.Router();
var check = require('express-validator/check').check;
var validationResult = require('express-validator/check').validationResult;
var matchedData = require('express-validator/filter').matchedData;
var firebase = require('firebase/app'); require('firebase/auth');
var passport = require('passport');




router.get('/',authenticationMiddleware, function(req, res, next) {
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
        .isLength({min:1})
        .withMessage(' min 1')
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
            req.login(user.uid,function (err) {
                res.redirect('/dashboard');

            });
        }
    });

});

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {

    done(null, user);
});

function authenticationMiddleware (req, res, next) {
    if (req.isAuthenticated()) return res.redirect('/dashboard');
    next();
}




module.exports = router;

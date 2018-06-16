var express = require('express');
var router = express.Router();
var check = require('express-validator/check').check,
    validationResult = require('express-validator/check').validationResult;
var matchedData = require('express-validator/filter').matchedData
var firebase = require('firebase/app'); require('firebase/auth');
var passport = require('passport');
var authenticationMiddleware = require('../auth/authMiddlewares').authenticationMiddleware;

/* GET users listing. */
router.get('/',authenticationMiddleware, function(req, res, next) {
    res.render('register', { title: 'Jellyfish Ninja',
        data:{},
        errors:{},
        errorMessage:" "
    });
});

router.post('/', [
    check('email')
        .isEmail()
        .withMessage('Not an email!')
        .trim()
        .normalizeEmail(),
    check('password')
        .isLength({min:6})
        .withMessage('Min 6')
        .trim()
],function(req, res, next) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('register', {
            title: 'Jellyfish Ninja',
            data: req.body,
            errors: errors.mapped(),
            errorMessage:" "
        });
    }

    const data = matchedData(req);
    console.log('Sanitized:', data);
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return res.render('register', {
                    title: 'Jellyfish Ninja',
                    data: req.body,
                    errors:{},
                    errorMessage:errorMessage
                });
    });


    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user.sendEmailVerification().then(function() {
                // Email sent.
            }).catch(function(error) {
                // An error happened.

            });

            req.logIn(user,function (err) {
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




module.exports = router;

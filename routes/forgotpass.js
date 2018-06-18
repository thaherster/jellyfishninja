var express = require('express');
var router = express.Router();
var check = require('express-validator/check').check,
    validationResult = require('express-validator/check').validationResult;
var matchedData = require('express-validator/filter').matchedData
var firebase = require('firebase/app'); require('firebase/auth');
var checkLoggedIn = require('../auth/authMiddlewares').checkLoggedIn;

router.get('/',checkLoggedIn, function(req, res, next) {
    res.render('forgotpass', {
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
        .normalizeEmail()
],function(req, res, next) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('forgotpass', {
            title: 'Jellyfish Ninja',
            data: req.body,
            errors: errors.mapped(),
            errorMessage:" "
        });
    } else {
        const data = matchedData(req);
        console.log('Sanitized:', data);
        firebase.auth().sendPasswordResetEmail(data.email)
            .then(function () {
                res.redirect('/login');
            })
            .catch(function (error) {
            // An error happened.
            return res.render('forgotpass', {
                title: 'Jellyfish Ninja',
                data: req.body,
                errors: {},
                errorMessage: error.toString()
            });
        });
    }
});

module.exports = router;

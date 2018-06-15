var express = require('express');
var router = express.Router();
import {check,validationResult} from 'express-validator/check'
import {matchedData} from 'express-validator/filter'
var firebase = require('firebase/app'); require('firebase/auth');
import {authenticationMiddleware} from '../auth/authMiddlewares'

router.get('/',authenticationMiddleware, function(req, res, next) {
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

var express = require('express');
var router = express.Router();
var check = require('express-validator/check').check;
var validationResult = require('express-validator/check').validationResult;
var matchedData = require('express-validator/filter').matchedData;
var firebase = require('firebase/app'); require('firebase/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
    return res.render('forgotpass', { title: 'Jellyfish Ninja',
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
        return res.render('forgotpass', {
            title: 'Jellyfish Ninja',
            data: req.body,
            errors: errors.mapped(),
            errorMessage:" "
        });
    }

    const data = matchedData(req);
    console.log('Sanitized:', data);

    firebase.auth().sendPasswordResetEmail(data.email).then(function() {
        // Email sent.
        return res.redirect('/login');
    }).catch(function(error) {
        // An error happened.
        return res.render('forgotpass', {
            title: 'Jellyfish Ninja',
            data: req.body,
            errors:{},
            errorMessage:error.toString()
        });
    });



});



module.exports = router;

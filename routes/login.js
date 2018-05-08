var express = require('express');
var router = express.Router();

var check = require('express-validator/check').check;
var validationResult = require('express-validator/check').validationResult;
var matchedData = require('express-validator/filter').matchedData;
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Jellyfish Ninja',
    data:{},
    errors:{}});
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
            errors: errors.mapped()
        });
    }

    const data = matchedData(req);
    console.log('Sanitized:', data);
    req.flash('success', 'Thanks for the message! I‘ll be in touch :)');
    res.redirect('/dashboard')

});



module.exports = router;

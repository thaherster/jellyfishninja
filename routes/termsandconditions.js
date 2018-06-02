var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/',function(req, res, next) {

    return res.render('termsandconditions', { title: 'Jellyfish Ninja' });

});




module.exports = router;

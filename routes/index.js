var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/',function(req, res, next) {
    console.log('hiiiasdsa')
    res.render('index', { title: 'Jellyfish Ninja' });
});




module.exports = router;

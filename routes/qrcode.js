var express = require('express');
var router = express.Router();
var firebase = require('firebase/app');require('firebase/database');
var qr = require('qr-image');
router.get('/', function(req, res, next) {

    var user=req.user.uid;
    var code = qr.image("jellyfish.ninja/"+user, { type: 'png', ec_level: 'H', size: 5, margin: 0 });
    res.setHeader('Content-type', 'image/png');
    code.pipe(res);

});




module.exports = router;

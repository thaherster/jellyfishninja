var express = require('express');
var router = express.Router();

var firebase = require('firebase/app'); require('firebase/auth');




router.get('/', function(req, res, next) {
   firebase.auth().signOut();
    res.redirect('/');
});


module.exports = router;

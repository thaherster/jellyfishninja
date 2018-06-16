var express = require('express');
var router = express.Router();
var firebase = require('firebase/app'); require('firebase/auth'); require('firebase/database');

router.get('/', function(req, res, next) {
    var dbRef = firebase.database().ref().child('Dummy_Payment/'+req.user.uid+'/viaAndroid/');
    var newPostRef = dbRef.push();
    newPostRef.set({
        name:req.user.name,
        email:req.query.email,
        contact:req.query.contact
    });
    res.sendStatus(200);


});


module.exports = router;

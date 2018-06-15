var express = require('express');
var router = express.Router();
var firebase = require('firebase/app'); require('firebase/auth');
import {authenticationMiddleware} from '../auth/authMiddlewares'

router.get('/', authenticationMiddleware,function(req, res, next) {

           return res.render('upgrade');
});

router.post('/',function(req, res, next) {

    console.log("DATAPAYMENT "+ "inside post  2" +JSON.stringify(req.body));
    var user = req.user.uid;
    var name =req.body.name;
    var email =req.body.email;
    var contact =req.body.contact;
    console.log("DATAPAYMENT "+ "inside post2");

    var  payment = {name:name,email:email,contact:contact};
    var dbRef = firebase.database().ref().child('Dummy_Payment/'+user+'/viaAndroid/');
    console.log("DATAPAYMENT "+ "inside post3 " +name +email+contact);
    var newPostRef = dbRef.push();
    console.log("DATAPAYMENT "+ "inside post4");
    newPostRef.set(payment);
    console.log("DATAPAYMENT "+ "inside post5");
    res.send({"bugsList":"dfs"});
});

function authenticationMiddleware (req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
}


module.exports = router;

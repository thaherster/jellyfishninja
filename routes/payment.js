var express = require('express');
var router = express.Router();
var firebase = require('firebase/app'); require('firebase/auth'); require('firebase/database');




router.get('/', function(req, res, next) {
    console.log("DATAPAYMENT "+ "inside post " +JSON.stringify(req));
    var user = req.user.uid;
    var name =req.query.name;
    var email =req.query.email;
    var contact =req.query.contact;
    console.log("DATAPAYMENT "+ "inside post2");

  var  payment = {name:name,email:email,contact:contact};
    var dbRef = firebase.database().ref().child('Dummy_Payment/'+user+'/viaAndroid/');
    console.log("DATAPAYMENT "+ "inside post3 " +name +email+contact);
    var newPostRef = dbRef.push();
    console.log("DATAPAYMENT "+ "inside post4");
    newPostRef.set(payment);
    console.log("DATAPAYMENT "+ "inside post5");
    res.sendStatus(200);


});
function Payment(name, email,contact){

    // Add object properties like this
    this.name = name;
    this.email = email;
    this.contact = contact;

}



module.exports = router;

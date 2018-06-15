var express = require('express');
var router = express.Router();
var firebase = require('firebase/app');  require('firebase/database');


router.get('/', function(req, res, next) {

    console.log("LISTRS "," childKey"+req.user.uid);
    var dbRef = firebase.database().ref().child('Applications/'+req.user.uid+'/projects/');
    var projectList=[];
    dbRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            projectList.push(Object.assign(childSnapshot.val(),{
                childKey: childSnapshot.key
            }));
        });
        console.log("LISTRSAAAAXXXXX "," projectList : "+projectList.toString());
        res.send({"projectList":projectList});
    });

});

module.exports = router;

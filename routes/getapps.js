var express = require('express');
var router = express.Router();
var firebase = require('firebase/app'); require('firebase/auth'); require('firebase/database');




router.get('/',isAuthenticated, function(req, res, next) {
    var user = firebase.auth().currentUser;
    console.log("LISTRS "," childKey"+user.uid);
    var dbRef = firebase.database().ref().child('Applications/'+user.uid+'/projects/');
    var projectList=[];
    dbRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            var project = new Project(childData.appname, childData.version,childData.package,childData.description,childData.apkfileurl,childKey);
            projectList.push(project);
        });
        console.log("LISTRSAAAAXXXXX "," projectList : "+projectList.toString());
        res.send({"projectList":projectList});

    });

});
function Project(appname, version,packages,description,apkfileurl,childKey){

    // Add object properties like this
    this.appname = appname;
    this.version = version;
    this.package = packages;
    this.description = description;
    this.apkfileurl = apkfileurl;
    this.childKey = childKey;
}

function isAuthenticated(req, res, next) {

    var user = firebase.auth().currentUser;

    if (user) {
        // User is signed in.
        return next();


    } else {
        // No user is signed in.
        res.redirect('/');

    }
}

module.exports = router;

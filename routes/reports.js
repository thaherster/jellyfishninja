var express = require('express');
var router = express.Router();
var firebase = require('firebase/app'); require('firebase/auth');

router.get('/', isAuthenticated,function(req, res, next) {

    var user = firebase.auth().currentUser;
    var dbRef = firebase.database().ref().child('Applications/'+user.uid+'/projects/');
    var projectList=[];
    dbRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            var project = new Project(childData.appname,childKey);
            projectList.push(project);
        });
        return res.render('reports',
            { title: 'Jellyfish Ninja',
                useremail:user.email,
                projectList:projectList
            });

    });

});

function isAuthenticated(req, res, next) {

    var user = firebase.auth().currentUser;

    if (user) {
        // User is signed in.
        return next();

    } else {
        // No user is signed in.
        res.redirect('/login');
    }
}

function Project(appname,childKey){

    // Add object properties like this
    this.appname = appname;
    this.childKey = childKey;
}


module.exports = router;

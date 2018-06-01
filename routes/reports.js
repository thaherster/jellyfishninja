var express = require('express');
var router = express.Router();
var firebase = require('firebase/app');

router.get('/',authenticationMiddleware,function(req, res, next) {

    console.log("DASH "+req.user);
    var dbRef = firebase.database().ref().child('Applications/'+req.user+'/projects/');
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
                useremail:req.user,
                projectList:projectList
            });

    });

});

function authenticationMiddleware (req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
}


function Project(appname,childKey){

    // Add object properties like this
    this.appname = appname;
    this.childKey = childKey;
}


module.exports = router;

var express = require('express');
var router = express.Router();
var firebase = require('firebase/app'); require('firebase/auth'); require('firebase/database');




router.get('/',isAuthenticated, function(req, res, next) {
    var user = firebase.auth().currentUser;
    var key =req.query.valueSelected;
    var dbRef = firebase.database().ref().child('Reports/'+user.uid+'/viaAndroid/').child(key);
    var bugsList=[];
    var apiList=[];
    var suggestionList=[];

    dbRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            var reports = new Reports(childData.key, childData.status,childData.text,childData.title,childData.type);
            if(childData.type==="0")
            {
                bugsList.push(reports);
            }
            else if(childData.type==="1")
            {
                apiList.push(reports);

            }
            else if(childData.type==="2")
            {
                suggestionList.push(reports);

            }
        });
        console.log("LISTRSAAAAREPORTS "," bugsList : "+bugsList.toString());
        res.send({"bugsList":bugsList,
                    "apiList":apiList,
                    "suggestionList":suggestionList});

    });

});
function Reports(key, status,text,title,type){

    // Add object properties like this
    this.key = key;
    this.status = status;
    this.text = text;
    this.title = title;
    this.type = type;
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

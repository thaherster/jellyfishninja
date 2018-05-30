var express = require('express');
var router = express.Router();
var firebase = require('firebase/app'); require('firebase/auth'); require('firebase/database');




router.get('/',isAuthenticated, function(req, res, next) {
    var user = firebase.auth().currentUser;
    var current_item =req.query.current_item;
    var status =req.query.status;
    var current_project =req.query.current_project;

    console.log(" current_item "+ JSON.stringify(current_item));
    console.log(" status "+ JSON.stringify(status));
    console.log(" current_project "+ JSON.stringify(current_project));

    var dbRef = firebase.database().ref().child('Reports/'+user.uid+'/viaAndroid/').child(current_project);
    var bugsList=[];
    var apiList=[];
    var suggestionList=[];
    dbRef.child(current_item.key).child("status").set(status);
    // res.sendStatus(200);
    dbRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            var reports = new Reports(childData.key, childData.status,childData.text,childData.title,childData.type,childData.imgurl);
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
function Reports(key, status,text,title,type,imgurl){

    // Add object properties like this
    this.key = key;
    this.status = status;
    this.text = text;
    this.title = title;
    this.type = type;
    this.imgurl = imgurl;
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

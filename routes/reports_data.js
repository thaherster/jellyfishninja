var express = require('express');
var router = express.Router();
var firebase = require('firebase/app'); require('firebase/auth'); require('firebase/database');




router.get('/', function(req, res, next) {
    var user = req.user.uid;
    var key =req.query.valueSelected;
    var dbRef = firebase.database().ref().child('Reports/'+user+'/viaAndroid/').child(key);
    var bugsList=[];
    var apiList=[];
    var suggestionList=[];

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



module.exports = router;

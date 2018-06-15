var express = require('express');
var router = express.Router();
var firebase = require('firebase/app');  require('firebase/database');


//TODO: need refactoring

router.get('/', function(req, res, next) {

    var deviceCount;
    var appCount;
    var reportCount;
    var openbugCount;

    var dbRefdeviceCount=  firebase.database().ref().child("Connected_Devices").child(req.user.uid).child("devices");
    var dbRefappCount = firebase.database().ref().child('Applications/'+req.user.uid+'/projects/');
    var dbRefreportCount = firebase.database().ref().child('Reports/'+req.user.uid+'/viaAndroid/');



    dbRefdeviceCount.once('value', function(snapshot) {
        deviceCount=  snapshot.numChildren();
        dbRefappCount.once('value', function(snapshot) {
            appCount=  snapshot.numChildren();

            reportCount=0;
            openbugCount=0;
            dbRefreportCount.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    reportCount+=childSnapshot.numChildren();
                    childSnapshot.forEach(function (child) {
                        if(child.child("status").val()==="0")
                        {openbugCount++;}
                    });
                });
                console.log("DASH deviceCount:"+deviceCount);
                console.log("DASH appCount:"+appCount);
                console.log("DASH reportCount:"+reportCount);
                console.log("DASH openbugCount:"+openbugCount);
                res.send({"deviceCount":deviceCount,
                "appCount":appCount,
                "reportCount":reportCount,
                "openbugCount":openbugCount});
            });
        });
    });
});



module.exports = router;

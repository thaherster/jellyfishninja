var express = require('express');
var router = express.Router();
var path = require("path");
var firebase = require('firebase/app'); require('firebase/auth');require('firebase/database');require('firebase/storage');
var multer  = require('multer');
var dbRef = firebase.database().ref();

var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
var myBucket = 'jellyfishninjaapks';
var fs = require('fs');
aws.config.loadFromPath('./s3_config.json');
var pushkey ='';
var url ='https://s3.ap-south-1.amazonaws.com/jellyfishninjaapks/';

var s3 = new aws.S3();



var upload = multer({storage: multerS3({
        s3: s3,
        bucket: myBucket,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            var user = req.user.uid;
            pushkey = dbRef.child('Applications/'+user+'/projects/').push().key;

            cb(null, pushkey+'.apk')
        }
    })});




router.post('/',upload.single('apkfile'),function(req, res, next) {

    var user = req.user.uid;

    var dbRefx = firebase.database().ref().child('Applications/'+user+'/projects');
    dbRefx.once('value', function(snapshot) {
       if(snapshot.numChildren()<=50)
       {
           var appInfo = req.body;
           var project = {
               'appname':appInfo.appname,
               'version':appInfo.version,
               'package':appInfo.package,
               'description':appInfo.description,
               'apkfileurl':url+pushkey+'.apk'
           };
           dbRefx.child("/"+pushkey+"/").set(project);
           // [END oncomplete]
           console.log('END');
           // $(".spn_hol").hide();
           res.sendStatus(200);
       }
       else {
           res.send({'message':'Limit Exceeded'});
       }

    });





});






module.exports = router;

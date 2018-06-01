var express = require('express');
var router = express.Router();
var path = require("path");
var firebase = require('firebase/app'); require('firebase/auth');require('firebase/database');require('firebase/storage');
var multer  = require('multer');
var storageRef = firebase.storage().ref();
var dbRef = firebase.database().ref();

var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
var myBucket = 'jellyfishninjaapks';
var myKey = 'AKIAJGFPY5ISORARL7IQ';
// const googleStorage = require('@google-cloud/storage');
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
            console.log("KEYSDSD 1"+JSON.stringify(req.body));
            pushkey = req.body.childKey;

            cb(null, pushkey+'.apk')
        }
    })});




router.post('/',upload.single('apkfile_update'),function(req, res, next) {
    console.log("KEYSDSD 2"+req.body.childKey);

    var user =req.user;
    //
    var dbRefx = firebase.database().ref().child('Applications/'+user+'/projects/'+pushkey);
    dbRefx.once('value', function(snapshot) {

            var appInfo = req.body;

            dbRefx.update({'version':req.body.version_update});
            // [END oncomplete]
            console.log('END');
            // $(".spn_hol").hide();
            res.sendStatus(200);


    });

});





module.exports = router;

var express = require('express');
var router = express.Router();
var path = require("path");
var firebase = require('firebase/app'); require('firebase/auth'); require('firebase/storage'); require('firebase/database');
var multer  = require('multer');
var storageRef = firebase.storage().ref();
var dbRef = firebase.database().ref();
// const googleStorage = require('@google-cloud/storage');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/apks');
    },
    filename:function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'.apk');

    }
});

var upload = multer({storage: storage});




router.post('/', isAuthenticated,upload.single('apkfile'),function(req, res, next) {
    var user = firebase.auth().currentUser;
    var pushkey = dbRef.child('Applications/'+user.uid).push().key;

    console.log("LGINCLD Login Called"+user.uid+" "+pushkey);
    var appInfo = req.body;
    console.log('LGINCLD form data', appInfo);
    var fs = require('fs');
    const testFolder = '/public/apks/';
    console.log('LGINCLD form XXXX apkfile',path.join(__dirname, './..', testFolder + req.file.filename));
    //
    var stream = fs.readFileSync(path.join(__dirname, './..', testFolder + req.file.filename));


    console.log("blaaah aa " +storageRef.child('/APK/'+user.uid+'/filelist/'+pushkey+'.apk').put(stream));
    //     .then(function(snapshot) {
    //     console.log('Uploaded', snapshot.totalBytes, 'bytes.');
    //     console.log('File metadata:', snapshot.metadata);
    //     // Let's get a download URL for the file.
    //     snapshot.ref.getDownloadURL().then(function(url) {
    //         console.log('File available at', url);
    //         // [START_EXCLUDE]
    //         // [END_EXCLUDE]
    //     });
    // }).catch(function(error) {
    //     // [START onfailure]
    //     console.error('Upload failed:', error);
    //     // [END onfailure]
    // });
    //
    // dbRef.child('users/' + user.uid).set(req.body);


    // [END oncomplete]



    console.log('END');

    // res.sendStatus(200);


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





module.exports = router;

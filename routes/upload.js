var express = require('express');
var router = express.Router();
var firebase = require('firebase/app'); require('firebase/auth'); require('firebase/storage'); require('firebase/database');
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
    cb(null, 'public/apks');
},
filename:function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.apk');

}
});
var upload = multer({storage: storage});var storageRef = firebase.storage().ref();
var dbRef = firebase.database().ref();



router.post('/', isAuthenticated,upload.single('apkfile'),function(req, res, next) {

    var user = firebase.auth().currentUser;
    var pushkey = dbRef.child('Applications/'+user.uid).push().key;
    console.log("LGINCLD Login Called"+user.uid+" "+pushkey);
    var appInfo = req.body;
    const apkfile = req.file;
    console.log('LGINCLD form data', appInfo);
    console.log('LGINCLD form apkfile', './public/apks/' + req.file.filename);
    var fs = require('fs');
    const testFolder = '/public/apks/';
    var stream = fs.readFileSync(__dirname + '/..'+testFolder + req.file.filename);
    var uploadTask = storageRef.child('APK/'+user.uid+'/'+pushkey+'.apk').put(stream);

    uploadTask.on('state_changed', function(snapshot){

        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function(error) {
        console.log('Upload '+error.message);

        // Handle unsuccessful uploads
    }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('LGINCLD File available at', downloadURL);
        });
    });

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

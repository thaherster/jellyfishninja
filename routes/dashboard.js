var express = require('express');
var router = express.Router();

router.get('/', authenticationMiddleware,function(req, res, next) {

    console.log("DASH "+req.user.uid);
    console.log("DASH "+req.user.email);
    console.log("DASH "+req.isAuthenticated());
    // https://www.npmjs.com/package/passport
    //     https://github.com/hendrysadrak/firestore-store
    // https://www.npmjs.com/package/passport-firebase-auth
           //https://www.youtube.com/watch?v=qaaUfaieHcE
           return res.render('dashboard',
               { title: 'Jellyfish Ninja',
                   user:req.user.uid,
                   useremail:req.user.email
               });
});



function authenticationMiddleware (req, res, next) {
        if (req.isAuthenticated()) return next();
        res.redirect('/login')
}

module.exports = router;



module.exports = function isAuthenticatedelseLogin(req, res, next) {
    // do any checks you want to in here
    var user = firebase.auth().currentUser;

    if (user) {
        // User is signed in.
        return next();

    } else {
        // No user is signed in.
    }


    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/login');
};


module.exports = function isAuthenticatedDash(req, res, next) {
    // do any checks you want to in here
    var user = firebase.auth().currentUser;

    if (user) {
        // User is signed in.
        res.redirect('/dash');


    } else {
        // No user is signed in.
        return next();
    }


    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE

};
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn('/login');
module.exports.authenticationMiddleware = function (req,res,next) {
    ensureLoggedIn(req,res,function () {
        res.locals.loggedIn = req.loggedIn = !!req.user && !!req.user.id;
        res.locals.user = req.user.uuid;
        res.locals.useremail = req.user.email
        next();
    })
}

module.exports.checkLoggedIn = function (req,res,next) {
    res.locals.loggedIn = req.loggedIn = !!req.user && !!req.user.id;
    if(req.loggedIn) {
        res.locals.user = req.user.uuid;
        res.locals.useremail = req.user.email
    }
    next();
}
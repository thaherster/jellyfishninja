const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
module.exports.authenticationMiddleware = function (req,res,next) {
    ensureLoggedIn(req,res,function () {
        res.locals.loggedIn = req.loggedIn = !!req.user && !!req.user.id;
        res.locals.user = req.user.uuid;
        res.locals.useremail = req.user.email
        next();
    })
}
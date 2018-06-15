var express = require('express');
var router = express.Router();
import {authenticationMiddleware} from '../auth/authMiddlewares'

router.get('/', authenticationMiddleware,function(req, res, next) {
    res.render('applications');
});


module.exports = router;

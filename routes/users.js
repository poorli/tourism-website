var express = require('express');
var User = require('../moudels/user');
var parseurl = require('parseurl');

var router = express.Router();



router.get('/', function(req, res){
    res.render("index");
});


router.get('/for',function(req, res, next){
    var views = req.session.views;

    if (!views) {
        views = req.session.views = {}
    }

    // get the url pathname
    var pathname = parseurl(req).pathname;
    console.log(pathname);

    // count the views
    views[pathname] = (views[pathname] || 0) + 1;
    //res.render('');
    //res.send("poor");
    console.log(pathname);
    //res.send(req.session);
    res.send('you viewed this page ' + req.session.views[pathname] + ' times');
});
module.exports = router;

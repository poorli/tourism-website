/**
 * Created by HaoBo on 2016/6/21.
 */
var express = require('express');

var router = express.Router();

router.get('/user', function (req, res, next) {
    //退出后清除session
    req.session.user = null;
    res.redirect('/');
});

router.get('/company', function (req, res, next) {
    //退出后清除session
    req.session.company = null;
    res.redirect('/');
});

router.get('/tourist', function (req, res, next) {
    //退出后清除session
    req.session.tourist = null;
    res.redirect('/');
});

module.exports = router; 

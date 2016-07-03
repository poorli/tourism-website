/**
 * Created by HaoBo on 2016/6/21.
 */
var express = require('express');
var User = require('../moudels/user');
var Company = require('../moudels/company');
var Tourist = require('../moudels/tourist');

var router = express.Router();

var newUser = new User();
var newCompany = new Company();
var newTourist = new Tourist();

//登录
router.route('/')
.get(function (req, res, next) {
    res.render('login',{
        user: req.session.user
    });
})
router.route('/user')
.get(function (req, res, next) {
    res.render('login');
})
.post(function (req, res, next) {
    var loginUser = {
        username: req.body['username'],
        password: req.body['password']
    };
    console.log(loginUser);
    newUser.find(loginUser, function (user) {
        console.log(user);
        if (user.join()) {
            req.session.user = loginUser;
            console.log("login success")
            res.redirect('/user');
        } else {
            req.session.error = "用户名或密码不正确";
            res.redirect('/login');
        }
    });
});


router.route('/company')
.get(function(req, res, next) {
	res.render('login_company');
})
.post(function (req, res, next) {
    var loginUser = {
        username: req.body['username'],
        password: req.body['password']
    };
    // console.log(loginUser);
    console.log("company login");
    newCompany.find(loginUser, function (user) {
        if (user.join()) {
            req.session.company = loginUser;
            console.log("login success");
            res.redirect('/company');
        } else {
            req.session.error = "用户名或密码不正确";
            res.redirect('/login/company');
        }
    });
});

router.route('/tourist')
.get(function(req, res, next) {
	res.render('login_tourist');
})
.post(function (req, res, next) {
    var loginUser = {
        username: req.body['username'],
        password: req.body['password']
    };
    console.log(loginUser);
    newTourist.find(loginUser, function (user) {
        if (user.join()) {
            req.session.tourist = loginUser;
            console.log("login success");
            res.redirect('/tourist');
        } else {
            req.session.error = "用户名或密码不正确";
            res.redirect('/login/tourist');
        }
    });
});

module.exports = router; 

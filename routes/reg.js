var express = require('express');
var User = require('../moudels/user');
var Company = require('../moudels/company');
var Tourist = require('../moudels/tourist');

var router = express.Router();

var newUser = new User();
var newCompany = new Company();
var newTourist = new Tourist();

//注册
router.route('/')
.get(function (req, res, next) {
    res.render('res');
})
.post(function (req, res, next) {
    var regUser = {
        username: req.body['username'],
        password: req.body['password']
    };
    newUser.find(regUser, function (user) {
        if (user.join()) {
            console.log("用户名存在");
            req.session.error = "账户已存在";
            res.redirect('/reg');
        } else {
            newUser.insert(regUser, function (result) {
                console.log("注册成功");
                req.session.error = "注册成功，请登录";
                res.redirect('/login')
            });
        }
    });
});

router.route('/company')
.get(function (req, res, next) {
    res.render('company_reg');
})
.post(function (req, res, next) {
    var regUser = {
        username: req.body['username'],
        password: req.body['password'],
        name: req.body['name'],
        introduce: req.body['introduce'],
        address: req.body['address']
    };
    newCompany.find({ username: req.body['username'] }, function (user) {
        if (user.join()) {
            console.log("用户名存在");
            req.session.error = "账户已存在";
            res.redirect('/reg/company');
        } else {
            newCompany.insert(regUser, function (result) {
                console.log("注册成功");
                req.session.error = "注册成功，请登录";
                res.redirect('/login/company')
            });
        }
    });
});

module.exports = router;
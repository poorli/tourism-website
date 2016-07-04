var express = require('express');
var User = require('../moudels/user');
var parseurl = require('parseurl');
var Tourist = require('../moudels/tourist');
var Company = require('../moudels/company');


var router = express.Router();
var newTourist = new Tourist();
var newCompany = new Company();
var newUser = new User();
 
router.get('/', function (req, res, next) {
    if (!req.session.user){
        // res.render('index');
        res.render('user');
    }else {
        res.render('user');
    }
});

router.route('/sightlist')
.get(function(req, res, next) {
    // authentication(req, res);
    newTourist.findSight({}, function(sight){
        if (sight.join()) {
            console.log(sight);
            res.render('sight_all', {
                sightList: sight
            });
        } else {
            // newTourist.insert(Sight, function(result) {
                console.log('添加景点成功');
                // res.redirect('/tourist/add');
            // })
        }
    })
})

router.route('/linelist')
.get(function(req, res, next) {
    // authentication(req, res);
    var sightList;
    newCompany.findLine({}, function(line){
        if (line.join()) {
            res.render('line_all', {
                lineList: line
            });
        } else {
                console.log('添加景点成功');
                // res.redirect('/tourist/add');
        }
    })
})

router.route('/line')
.get(function(req, res, next) {
    authentication(req, res);
    console.log(req.query.name);
    var findKey = {
        name: req.query.name
    }
    newCompany.findLine(findKey, function(line) {
        // console.log(line);
        if (line.join()) {
            console.log(line);
            var oldLine = line[0];
            //找出所有景点供选择路线
            newTourist.findSight({}, function(sight) {
                if (sight.join()) {
                    // console.log('景点存在');
                    console.log(sight);
                    res.render('line', {
                        sightList: sight,
                        line: oldLine
                    });
                } else {
                    // newTourist.insert(Sight, function(result) {
                        console.log('添加景点成功');
                    // res.redirect('/tourist/add');
                    // })
                }
            })
        } else {
            req.session.error = "没有可查询的线路"
            res.redirect('/user');
        }
    })
})

router.route('/sight')
.get(function(req, res, next) {
    authentication(req, res);
    console.log(req.query.name);
    var findKey = {
        name: req.query.name
    }
    newTourist.findSight(findKey, function(sight){
        if (sight.join()) {
            console.log(sight);
            res.render('sight', {
                sight: sight[0]
            });
        } else {
            console.log('添加景点成功');
            req.session.error = "没有可查询的景点"
            res.redirect('/user');
        }
    })
})


router.route('/order')
.post(function (req, res, next) {
    authentication(req, res);
    findKey = {
        username: req.session.user.username,
        name: req.body["name"],
        id: req.body["id"]
    }
    Order = req.body;
    Order.username = req.session.user.username;
    newUser.findOrder(findKey, function (order) {
        if (order.join()) {
            req.session.error = "该身份已预定此路线";
            res.redirect('/user');
        } else {
            newUser.insertOrder(Order, function (result) {
                req.session.error = "预定成功";
                res.redirect('/user')
            });
        }
    });
});


router.get('/inquire',function(req, res, next) {
    res.render('user');
})
router.post('/inquire',function(req, res, next) {
    authentication(req, res);
    // var keyWord = '/' +　req.query.line　+ '/';
    var keyWord = '/' +　req.body['line']　+ '/';
    var reg = eval(keyWord); 
    var KeyWord = {
        name : reg
    }
    newUser.inquireSight(KeyWord, function (lineList) {
        if (lineList.join()) {
            res.render('line_search', {
                lineList: lineList
            });
        }
        else {
            req.session.error = "没有符合条件的线路"
            res.redirect('/user');
        }

    })
})

function authentication(req, res) {
    if (!req.session.user) {
        console.log(req.session);
        //直接访问 home page 时，进行身份验证
        req.session.error = "您没有访问权限，请先登录";
        return res.redirect('/login');
    }
}

module.exports = router;

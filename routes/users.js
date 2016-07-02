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
        res.render('index');
    }else {
        res.render('user');
        // var post = new Post();
        // post.find({}, function(posts){
        //     console.log("have session");
        //     res.render('loginIndex',{
        //         user: req.session.user,
        //         posts: posts
        //     });
        // });
    }
});

router.route('/sightlist')
.get(function(req, res, next) {
    var sightList;
    newTourist.findSight({}, function(sight){
        if (sight.join()) {
            console.log(sight);
            res.render('all_sight', {
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
    var sightList;
    newCompany.findLine({}, function(line){
        if (line.join()) {
            res.render('all_line', {
                lineList: line
            });
        } else {
            // newTourist.insert(Sight, function(result) {
                console.log('添加景点成功');
                // res.redirect('/tourist/add');
            // })
        }
    })
})

router.route('/line')
.get(function(req, res, next) {
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
            console.log('未找到景点');
        }
    })
})

router.route('/sight')
.get(function(req, res, next) {
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
            // newTourist.insert(Sight, function(result) {
                console.log('添加景点成功');
                // res.redirect('/tourist/add');
            // })
        }
    })

})


router.route('/order')
.post(function (req, res, next) {
    Order = {
        user: req.session.user.username,
        line: req.body['line']
    }
    newUser.findOrder(Order, function (order) {
        if (order.join()) {
            console.log("用户名存在");
            req.session.error = "账户已存在";
            res.redirect('/user');
        } else {
            newUser.insertOrder(Order, function (result) {
                console.log("注册成功");
                req.session.error = "注册成功，请登录";
                res.redirect('/user')
            });
        }
    });
});


router.get('/inquire',function(req, res, next) {
    var keyWord = '/' +　req.query.line　+ '/';
    var reg = eval(keyWord); 
    var KeyWord = {
        name : reg
    }
    // console.log(req.query.line.toString());
    // if (req.query.line === []) {
    //     res.redirect('/user/line');
    // }
    newUser.inquireSight(KeyWord, function (lineList) {
        console.log(lineList);
         res.render('all_line', {
            lineList: lineList
         }); 
    })
})
// router.route('/addorder')
// .post(function (req, res, next) {
//     Order = {
//         // user: req.session.user.username,
//         // line: req.body['line']
//         user: 'cai',
//         line: '长沙一日游'
//     }
//     newUser.findOrder(Order, function (order) {
//         if (user.join()) {
//             console.log("预约已存在");
//             req.session.error = "预约已存在";
//             res.redirect('/');
//         } else {
//             newUser.insertOrder(Order, function () {
//                 console.log("预约成功");
//                 req.session.error = "注册成功，请登录";
//                 res.redirect('/')
//             });
//         }
//     });
// });
// router.get('/', function(req, res){
//     res.render("index");
// });


// router.get('/for',function(req, res, next){
//     var views = req.session.views;

//     if (!views) {
//         views = req.session.views = {}
//     }

//     // get the url pathname
//     var pathname = parseurl(req).pathname;
//     console.log(pathname);

//     // count the views
//     views[pathname] = (views[pathname] || 0) + 1;
//     //res.render('');
//     //res.send("poor");
//     console.log(pathname);
//     //res.send(req.session);
//     res.send('you viewed this page ' + req.session.views[pathname] + ' times');
// });
module.exports = router;

var express = require('express');
var User = require('../moudels/user');
var Company = require('../moudels/company');
var Tourist = require('../moudels/tourist');
var Post = require('../moudels/post')

var router = express.Router();
var newUser = new User();
var newCompany = new Company();
var newTourist = new Tourist();

//首页
router.get('/',function(req, res, next) {
    var isLogin;
    if (req.session.user||req.session.company||req.session.tourist) {
        isLogin = true; 
    }
    res.render('index',{
        isLogin: isLogin
    });
})
// router.get('/', function (req, res, next) {
//     if (!req.session.user){
//         res.render('index');
//     }else {
//         var post = new Post();
//         post.find({}, function(posts){
//             console.log("have session");
//             res.render('loginIndex',{
//                 user: req.session.user,
//                 posts: posts
//             });
//         });
//     }
// });


        //}
/*        if (loginType == "company"){
            newCompany.find(loginUser, function(user){
                if (user.join()) {
                    req.session.user = loginUser;
                    res.redirect('/');
                }         else {
                    req.session.error = "用户名或密码不正确";
                    res.redirect('/login');
                }
            });
        }*/

/*        if (loginType == "tourist"){
            newTourist.find(loginUser,function(user){
                if (user.join()) {
                    req.session.user = loginUser;
                    res.redirect('/');
                }         else {
                    req.session.error = "用户名或密码不正确";
                    res.redirect('/login');
                }
            });
        }*/




//进入主页
router.get('/home', function (req, res) {
    //身份验证，验证session
    authentication(req, res);
    res.render('home', {
        user: req.session.user
    });
});

function authentication(req, res) {
    if (!req.session.user) {
        console.log(req.session);
        //直接访问 home page 时，进行身份验证
        req.session.error = "请先登录";
        return res.redirect('/login');
    }
}

//退出登录
// router.get('/loginout', function (req, res, next) {
//     //退出后清除session
//     req.session.user = null;
//     res.redirect('/');
// });

router.get('/u/:user', function(req, res){
    var post = new Post();
    post.find({"username": req.params.user}, function(posts){
        console.log("have session");
        res.render('personNews',{
            posts: posts,
            user: req.session.user
        });
    });
});
//router.get('/foo', function (req, res, next) {
//    res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
//});
//
//router.get('/bar', function (req, res, next) {
//    res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
//});

module.exports = router;

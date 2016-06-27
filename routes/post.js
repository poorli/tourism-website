/**
 * Created by HaoBo on 2016/5/9.
 */
var express = require('express');
var router = express.Router();
var Post = require('../moudels/post')

router.post('/news', function(req,res){
    authentication(req, res);
    var currentUser = req.session.user;
    var post = new Post(currentUser.name, req.body.content);
    post.insert(function(result){
        res.redirect('/');
    });
});

module.exports = router;

function authentication(req, res) {
    if (!req.session.user) {
        console.log(req.session);
        //直接访问 home page 时，进行身份验证
        req.session.error = "请先登录";
        return res.redirect('/login');
    }
}
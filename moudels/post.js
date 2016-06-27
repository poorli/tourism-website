/**
 * Created by HaoBo on 2016/5/8.
 */
var Db = require('./db');
var MongoClient = Db.MongoClient;
var assert = require('assert');
//var dbOperation = require('dbOperation');
var url = Db.Setting.url;

function Post(username, content, time){
    this.username = username;
    this.content = content;
    if (time){
        this.time = time;
    } else {
        this.time = new Date();
    }
}

module.exports = Post;

Post.prototype.insert = function(callback) {
    console.log(this.content);
    var post = {
        username: this.username,
        content: this.content,
        time: this.time
    };
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection('posts');

        collection.insertOne(post, function (err, result) {
            assert.equal(err, null);
            callback(result);
            db.close();
        });
    });
};

Post.prototype.find = function(condition, callback){
    MongoClient.connect(url, function(err, db){
        var collection = db.collection('posts');

        collection.find(condition).sort({time: -1}).toArray(function(err, docs){
            //console.log(docs);
            var posts = [];
            docs.forEach(function(doc, index){
                var post = new Post(doc.username, doc.content, doc.time);
                posts.push(post);
            });
            //console.log(posts);
            callback(posts);
            db.close();
        })
    })
};

//test

//var post = new Post("poor_li", "7 post");
//post.insert(function(result){
//    //console.log(result);
//    post.find({}, function(posts){
//        console.log(posts[0].username + " " + posts[0].content + " " + posts[0].time);
//    })
//});
//post.find({}, function(posts){
//        console.log(posts[0].username + " " + posts[0].content + " " + posts[0].time);
//    });


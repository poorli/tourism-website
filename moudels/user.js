/**
 * Created by HaoBo on 2016/5/7.
 */
var Db = require('./db');
var MongoClient = Db.MongoClient;
var assert = require('assert');
var url = Db.Setting.url;

function User(user) {
}
module.exports = User;

User.prototype.insert = function(user, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection('user');

        collection.insertOne(user, function (err, result) {
            assert.equal(err, null);
            callback(result);
            db.close();
        });
    });
};
/**
 * 查找用户
 * @param {object} 查找条件
 * @param {function} 回调函数 参数为查找到的collection
 * */
User.prototype.find = function find(user,callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection("user");

        collection.find(user).toArray(function (err, docs) {
            assert.equal(err, null);
            callback(docs);
            db.close();
        });
    });
};


/**
 * Created by HaoBo on 2016/5/9.
 */
var Db = require('./db');
var MongoClient = Db.MongoClient;
var assert = require('assert');

function Base() {
}
module.exports = Base;

Base.prototype.insert = function (url, collectionName, insertContent, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection(collectionName);

        collection.insertOne(insertContent, function (err, result) {
            assert.equal(err, null);
            callback(result);
            db.close();
        });
    });
};

Base.prototype.find = function(url, collectionName, condition,  callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection(collectionName);

        collection.find(condition).toArray(function (err, docs) {
            assert.equal(err, null);
            callback(docs);
            db.close();
        });
    });
};


//test

//var base = new Base();
//base.find('mongodb://127.0.0.1:27017/myapp', {"name": "myname"}, "user", function(docs){
//    console.log(docs);
//}
//);
//base.insert('mongodb://127.0.0.1:27017/myapp', {"name": "myname", "password": "wowo"}, "user", function(result){
//    console.log("insert success");
//    console.log(result.toString());
//});
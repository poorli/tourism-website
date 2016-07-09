/**
 * Created by HaoBo on 2016/5/7.
 */
var Db = require('./db');
var MongoClient = Db.MongoClient;
var assert = require('assert');
var url = Db.Setting.url;

var DbOperation = require('./dbOperation');

var Operation = new DbOperation();

function Company(user) {
}


Company.prototype.insert = function(user, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection('company');

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
Company.prototype.find = function find(user,callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection("company");

        collection.find(user).toArray(function (err, docs) {
            console.log("sucess company");
            assert.equal(err, null);
            callback(docs);
            db.close();
        });
    });
};

Company.prototype.findLine = function find(user,callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection("line");

        collection.find(user).toArray(function (err, docs) {
            console.log("sucess line");
            assert.equal(err, null);
            callback(docs);
            db.close();
        });
    });
};

Company.prototype.insertLine = function(user, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection('line');

        collection.insertOne(user, function (err, result) {
            assert.equal(err, null);
            callback(result);
            db.close();
        });
    });
};


Company.prototype.deleteLine = function(deleteKey,callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection("line");
        // Remove all the document
        collection.deleteOne(deleteKey, {w:1}, function(err, result) {
          assert.equal(null, err);
          assert.equal(1, result.result.n);
          callback(result);
          db.close();
        });
    });
};

Company.prototype.modifyLine = function(formerKey, newKey, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection("line");
        collection.updateOne(formerKey, newKey, {upsert:true, w: 1}, function(err, result) {
            assert.equal(null, err);
            assert.equal(1, result.result.n);
            db.close();
            callback(result);
        });
    });
};

Company.prototype.findLineOrder = function find(user,callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection("order");

        collection.find(user).toArray(function (err, docs) {
            console.log("sucess line");
            assert.equal(err, null);
            callback(docs);
            db.close();
        });
    });
};

Company.prototype.findLineOrder = function find(condition,callback) {
    Operation.find(url, "order", condition, callback );
};



module.exports = Company;
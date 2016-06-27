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

/**
 * 查找用户
 * @param {object} 查找条件
 * @param {function} 回调函数 参数为查找到的collection
 * */
 User.prototype.find = function find(user,callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection("tourist");
        console.log('jin ru cha xun ');
        collection.find(user).toArray(function (err, docs) {
            console.log('jin ru cha xun ');
            assert.equal(err, null);
            callback(docs);
            db.close();
        });
    });
};


//  User.prototype.insert = function(user, callback) {
//     MongoClient.connect(url, function (err, db) {
//         assert.equal(null, err);
//         var collection = db.collection('sight');

//         collection.insertOne(user, function (err, result) {
//             assert.equal(err, null);
//             callback(result);
//             db.close();
//         });
//     });
// };


User.prototype.findSight = function find(user,callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection("sight");

        collection.find(user).toArray(function (err, docs) {
            assert.equal(err, null);
            callback(docs);
            db.close();
        });
    });
};

User.prototype.deleteSight = function(deleteKey,callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection("sight");
        // Remove all the document
        collection.deleteOne(deleteKey, {w:1}, function(err, r) {
          assert.equal(null, err);
          assert.equal(1, r.result.n);
          db.close();
        });
    });
};

User.prototype.modifySight = function(formerKey, newKey, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection("sight");
        collection.updateOne(formerKey, newKey, {upsert:true, w: 1}, function(err, result) {
            assert.equal(null, err);
            assert.equal(1, result.result.n);
            db.close();
            callback(result);
        });
    });
};


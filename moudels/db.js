/**
 * Created by HaoBo on 2016/5/6.
 */
var setting = require('./setting');
var mongoClient = require('mongodb').MongoClient;
module.exports = {
    Setting: setting,
    MongoClient: mongoClient
};


//var Connection = require('mongodb').Connection;
//var Server = require('mongodb').Server;
//var db = new Db(Setting.db, new Server(Setting.host, Setting.port, {auto_reconnect:true, native_parser: true}),{safe: false});
//var db = new Db(new Server(Setting.host, Setting.port), {safe: false});

//module.exports = new Db(setting.db, new Server(setting.host, Connection.DEFAULT_PORT, {}));
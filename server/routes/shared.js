
//If you want to connect to cloud Mongo Cluster, follow below code
var MongoClient = require('mongodb').MongoClient;
var jwt = require('jsonwebtoken');
var shared = {};

shared.getMongoCon = function (res, cb) {

    var url = "mongodb+srv://dbadmindev:dbadmindev@clusterdev-syp8q.mongodb.net/test?retryWrites=true&w=majority";

    MongoClient.connect(url, function (err, cluster) {
        if (err) {
            res.send('db con error');
        }
        var db = cluster.db('onlineshopping');
        cb(db);
    })

    //If you want to connect to local MongoDB server, follow below code
    // var mongo=require('mongodb');
    // var jwt=require('jsonwebtoken');
    // var shared={};

    // var mongoClient=mongo.MongoClient;
    // var url="mongodb://localhost:27017";
    // mongoClient.connect(url,function(err,cluster){
    //     if(err){
    //         res.send('db conn error');
    //     }
    //     var db=cluster.db('onlineshopping');
    //     cb(db);
    // })
}
shared.fnCheckToken = function (req, res, next) {
    var token = req.headers.authorization;
    if (token) {
        var isValid = jwt.verify(token, 'my-token');
        if (isValid) {
            next();
        } else {
            res.status(401).send({ msg: 'Wrong token' })
        }

    } else {
        res.status(401).send({ msg: 'Unauthorized persone' })
    }

}

module.exports = shared;

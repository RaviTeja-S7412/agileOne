const MongoClient = require("mongodb").MongoClient
const urlMongo = "mongodb://localhost:27017"

var db;

function connectToServer( callback ) {
    MongoClient.connect(urlMongo,  { useUnifiedTopology: true , useNewUrlParser: true }, function( err, client ) {
        db  = client.db('agileOne');
        return callback( err );
    })
}

function getDb() {
    return db
}

module.exports = {connectToServer, getDb}
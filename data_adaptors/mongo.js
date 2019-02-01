// The mongo db client

var mdb = require('mongodb');
const client = mdb.MongoClient;

require('dotenv').config();

const state = {
    conn: null
}

const connectionUrl = "mongodb://" + process.env.MONGO_HOST + 
    ":" + 
    process.env.MONGO_PORT + 
    "/" + 
    process.env.MONGO_DB;

var connect = async function(url = connectionUrl) {
    console.log(connectionUrl);
    return new Promise((resolve, reject) => {
        client.connect(url, function (err, resp) {
            if (!err) {
                console.log("Connected to MongoDB server", url)
                state.conn = resp
                resolve(true)
            } else {
                reject(err)
            }
        })
    })
}

var close = function() {
    state.conn.close()
}

var insert = async function(data) {
    if(!state.conn) {
        await connect();
    }

    const db = state.conn.db(process.env.MONGO_DB);
    await db.collection("event_data").insertOne(data);
}

module.exports = {
    connect, close, insert
}


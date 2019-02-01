// The data service module provides an abstraction between the listener and the data sink.
// To add a new data sink,
//      1. Create the js client in the adaptors dir (similar to mongo client)
//      2. Import the new js client here
//      3. Use init() for initializing the client - connection, priming, etc.
//      4. Use insert() for (of course) inserting substrate events data

const mongo = require('./adaptors/mongo');

var init = async function() {
    await mongo.connect();
}

var insert = async function(data) {
    await mongo.insert(data);
}

module.exports = { init, insert }
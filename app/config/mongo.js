const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { logger } = require('../util/logger');

const mongo = { connection: null };
const DB_NAME = 'solar_objects';
const COLLECTION = 'planets';

mongo.connect = async (
    url = 'mongodb://172.18.0.2:27017',
    dbName = DB_NAME
) => {
    const connectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    const client = await MongoClient.connect(url, connectionOptions);
    mongo.db = client.db(dbName);
    logger.info('Connected to URL = %s, DB Name = %s', url, dbName);
};

mongo.close = () => {
    assert.notEqual(mongo.connection, null);
    mongo.connection.close();
};

module.exports = { mongo, COLLECTION };

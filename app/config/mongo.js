const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { logger } = require('../config/logger');
const mongo = { connection: null };
const DB_NAME = 'solar_objects';
const COLLECTION = 'planets';

mongo.connect = async (url = 'mongodb://mongodb:27017', dbName = DB_NAME) => {
    const connectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    const client = await MongoClient.connect(url, connectionOptions);
    mongo.db = await client.db(dbName);
    logger.info(`Connected to URL = ${url}, DB Name = ${dbName}`);
    await createUniqueIndex(mongo.db.collection(COLLECTION));
    logger.debug(
        'Compound index created to ensure uniqueness inside solar systems'
    );
};

/**
 * The created index enforces uniqueness for the combination of name,
 * and solarSystem values
 */
const createUniqueIndex = async collection => {
    return await collection.createIndex(
        { name: 1, solarSystem: 1 },
        { unique: true }
    );
};
mongo.close = () => {
    assert.notEqual(mongo.connection, null);
    mongo.connection.close();
};

module.exports = { mongo, COLLECTION };

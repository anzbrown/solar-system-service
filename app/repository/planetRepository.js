const assert = require('assert');
const { mongo } = require('../config/mongo');
const { logger } = require('../util/logger');
const COLLECTION = 'planets';

const insert = async solarObject => {
    assert.notEqual(mongo.db.connection, null);
    const collection = mongo.db.connection.collection(COLLECTION);
    logger.debug(
        `Persisting document into collection = ${COLLECTION}`,
        COLLECTION
    );
    return collection.insertOne(solarObject);
};

const findAll = async () => {
    assert.notEqual(mongo.db, null);
    const collection = mongo.db.collection(COLLECTION);
    return await collection.find().toArray();
};

const findByName = async name => {
    assert.notEqual(mongo.db, null);
    const collection = mongo.db.collection(COLLECTION);
    return await collection.findOne({ name: name });
};

// const updateSolarObject = (id, project) => {
//     assert.notEqual(mongo.db, null);
//     const collection = mongo.db.collection(COLLECTION);
//
//     return new Promise((resolve, reject) => {
//         const objID = new mongoClient.ObjectID(id);
//         resolve(
//             collection.updateOne(
//                 { _id: objID, tenantId: project.tenantId },
//                 {
//                     $set: {
//                         name: project.name,
//                         status: project.status,
//                         version: project.version,
//                         files: project.files,
//                     },
//                 }
//             )
//         );
//     });
// };
//
// const deleteSolarObject = (id, tenantId) => {
//     assert.notEqual(mongo.db, null);
//     const collection = mongo.db.collection(COLLECTION);
//
//     return new Promise((resolve, reject) => {
//         const objID = new mongoClient.ObjectID(id);
//         resolve(collection.deleteOne({ _id: objID, tenantId: tenantId }));
//     });
// };

module.exports = {
    insert,
    findAll,
    findByName,
};

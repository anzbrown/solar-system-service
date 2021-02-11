const assert = require('assert');
const { mongo, COLLECTION } = require('../config/mongo');
const { logger } = require('../util/logger');

const insert = async solarObject => {
    assert.notEqual(mongo.db.connection, null);
    const collection = mongo.db.connection.collection(COLLECTION);
    logger.debug('Persisting document into collection = %s', COLLECTION);
    return collection.insertOne(solarObject);
};

const findAll = async () => {
    assert.notEqual(mongo.db.connection, null);
    const collection = mongo.db.connection.collection(COLLECTION);

    return await collection
        .find({
            projection: {
                name: 1,
                status: 1,
                tenantId: 1,
                version: 1,
            },
        })
        .toArray();
};

const findById = async id => {
    assert.notEqual(mongo.db.connection, null);
    const collection = mongo.db.connection.collection(COLLECTION);
    return await collection.findOne({ _id: id });
};

// const updateSolarObject = (id, project) => {
//     assert.notEqual(mongo.db.connection, null);
//     const collection = mongo.db.connection.collection(COLLECTION);
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
//     assert.notEqual(mongo.db.connection, null);
//     const collection = mongo.db.connection.collection(COLLECTION);
//
//     return new Promise((resolve, reject) => {
//         const objID = new mongoClient.ObjectID(id);
//         resolve(collection.deleteOne({ _id: objID, tenantId: tenantId }));
//     });
// };

module.exports = {
    insert,
    findAll,
    findById,
};

const assert = require('assert');
const { mongo } = require('../config/mongo');
const COLLECTION = 'planets';

const loadCollection = () => {
    assert.notEqual(mongo.db, null);
    return mongo.db.collection(COLLECTION);
};

const insert = async solarObject => {
    const collection = loadCollection();
    return collection.insertOne(solarObject);
};

const findAllBySolarSystem = async solarSystem => {
    const collection = loadCollection();
    return await collection.find({ solarSystem: solarSystem }).toArray();
};

const findByName = async (solarSystem, name) => {
    const collection = loadCollection();
    return await collection.findOne({ solarSystem: solarSystem, name: name });
};

const findAllSolarSystems = async () => {
    const collection = loadCollection();
    return await collection.distinct('solarSystem');
};

const aggregateMass = async solarSystem => {
    const collection = loadCollection();
    return await collection
        .aggregate([
            { $match: { solarSystem: solarSystem } },
            { $project: { _id: 0, mass: 1, solarSystem: 1 } },
            { $group: { _id: '$solarSystem', totalMass: { $sum: '$mass' } } },
        ])
        .next();
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
    findAllBySolarSystem,
    findByName,
    findAllSolarSystems,
    aggregateMass,
};

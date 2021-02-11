const { throwError } = require('../util/utils');
const { mongo } = require('../config/mongo');
const COLLECTION = 'planets';

const loadCollection = () => {
    return (
        mongo.db?.collection(COLLECTION) ?? throwError('Database errors.', 500)
    );
};

/**
 * inserts a new planet if a planet doesn't already exist with the same name
 * and solarSystem values
 * If a planet does exist with these values then it is updated with the new values
 * @param solarObject
 * @returns {Promise<*>}
 */
const createPlanet = async solarObject => {
    const collection = loadCollection();
    return await collection.update(
        { name: solarObject.name, solarSystem: solarObject.solarSystem },
        solarObject,
        { upsert: true }
    );
};

const updatePlanet = async solarObject => {
    const collection = loadCollection();
    return await collection.updateOne(solarObject);
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

module.exports = {
    createPlanet,
    updatePlanet,
    findAllBySolarSystem,
    findByName,
    findAllSolarSystems,
    aggregateMass,
};

const { throwError } = require('../util/utils');
const { mongo, COLLECTION } = require('../config/mongo');

/**
 * ensure that an active connection is available, otherwise throw an internal server error
 * @returns {*|void}
 */
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

/**
 * aggregate the planets in a solar system
 * returns a value of the total mass of each planet and a count of the number of planets
 * @param solarSystem to retrieve the aggregate data for
 * @returns {Promise<*>}
 */
const aggregatePlanets = async solarSystem => {
    const collection = loadCollection();
    return await collection
        .aggregate([
            // filter the document by the solarSystem field
            { $match: { solarSystem: solarSystem } },
            // extract only the mass, and solarSystem value to limit data retrieval
            { $project: { _id: 0, mass: 1, solarSystem: 1 } },
            // group by the solarSystem value, calculate sum of mass values, count the number of planets
            {
                $group: {
                    _id: '$solarSystem',
                    totalMass: { $sum: '$mass' },
                    numberOfPlanets: { $sum: 1 },
                },
            },
        ])
        .next();
};

module.exports = {
    createPlanet,
    updatePlanet,
    findAllBySolarSystem,
    findByName,
    findAllSolarSystems,
    aggregatePlanets,
};

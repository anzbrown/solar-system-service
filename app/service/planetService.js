const { capitalize, pascalCase } = require('../util/utils');
const { validatePlanet, validateSatellite } = require('../util/validators');
const {
    findAllBySolarSystem,
    findByName,
} = require('../repository/planetRepository');

/**
 * get a list of all the planet information from MongoDB
 * @returns planets list
 */
const getPlanets = async solarSystem => {
    const planets = await findAllBySolarSystem(pascalCase(solarSystem));
    return (
        Object.values(planets) ??
        throwError(`No planets exist in this solar system`, 404)
    );
};

/**
 * get information on a specific planet
 * @param solarSystem
 * @param name of a specific planet to retrieve information on
 * @returns detailed information on specific planet
 */
const getPlanet = async (solarSystem, name) => {
    const planet = await findByName(pascalCase(solarSystem), capitalize(name));
    return planet ?? throwError(`No planet exists named: ${name}`, 404);
};

const addPlanet = async () => {};
const updatePlanet = async () => {};

const throwError = (message, status) => {
    const error = new Error(message);
    error.status = status;
    throw error;
};

module.exports = { getPlanets, getPlanet, addPlanet, updatePlanet };

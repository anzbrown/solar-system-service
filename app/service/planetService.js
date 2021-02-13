const { capitalize, pascalCase, throwError } = require('../util/utils');
const { validatePlanet } = require('../util/validators');
const {
    findAllBySolarSystem,
    findByName,
    createPlanet,
} = require('../repository/planetRepository');

/**
 * get a list of all the planets in a solar system
 * @returns planets list
 */
const getPlanets = async solarSystem =>
    await findAllBySolarSystem(pascalCase(solarSystem));

/**
 * get information on a specific planet
 * @param solarSystem
 * @param name of a specific planet to retrieve information on
 * @returns detailed information on specific planet
 */
const getPlanet = async (solarSystem, name) =>
    await findByName(pascalCase(solarSystem), capitalize(name));

/**
 * functions as the Create new planet and Update existing planet method
 * if a planet does not exist with a specific name and solar system value,
 * then a new planet is created with these values.
 * If a planet already exists with the name and solar system values, then its
 * values are replaced with the new values from the request body
 * @param solarSystem to create the new planet in
 * @param planet the new planet being created
 * @returns {Promise<void>}
 */
const updatePlanet = async (solarSystem, planet) => {
    try {
        // pascal case the solar system name for consistency
        planet.solarSystem = pascalCase(solarSystem);
        await validatePlanet(planet);
        return await createPlanet(planet);
    } catch (err) {
        throwError(err.message, 400);
    }
};

module.exports = { getPlanets, getPlanet, updatePlanet };

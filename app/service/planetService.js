const { capitalize, pascalCase, throwError } = require('../util/utils');
const { validatePlanet } = require('../util/validators');
const {
    findAllBySolarSystem,
    findByName,
    createPlanet,
} = require('../repository/planetRepository');

/**
 * get a list of all the planet information from MongoDB
 * @returns planets list
 */
const getPlanets = async solarSystem => {
    const planets = await findAllBySolarSystem(pascalCase(solarSystem));
    return planets?.length > 0
        ? planets
        : throwError(`No planets exist in: ${solarSystem}`, 404);
};

/**
 * get information on a specific planet
 * @param solarSystem
 * @param name of a specific planet to retrieve information on
 * @returns detailed information on specific planet
 */
const getPlanet = async (solarSystem, name) => {
    const planet = await findByName(pascalCase(solarSystem), capitalize(name));
    return (
        planet ??
        throwError(`No planet exists named: ${name} in ${solarSystem}`, 404)
    );
};

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
        await validatePlanet(planet);
        if (pascalCase(solarSystem) === pascalCase(planet.solarSystem)) {
            // pascal case the solar system name for consistency
            planet.solarSystem = pascalCase(planet.solarSystem);
            await createPlanet(planet);
        } else {
            throwError(
                'Request body solarSystem value does not match request path solar system value',
                400
            );
        }
    } catch (err) {
        throwError(err.message, 400);
    }
};

module.exports = { getPlanets, getPlanet, updatePlanet };

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

const addPlanet = async (solarSystem, planet) => {
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

const updatePlanet = async () => {};

module.exports = { getPlanets, getPlanet, addPlanet, updatePlanet };

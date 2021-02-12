const { throwError } = require('../util/utils');
const {
    findAllSolarSystems,
    aggregatePlanets,
} = require('../repository/planetRepository');

/**
 * get a summary of all solar systems, including a total of all the mass in
 * that solar system
 * @returns solar systems list with a total amount of mass
 */
const getSolarSystems = async () => {
    const solarSystems = await findAllSolarSystems();
    if (!solarSystems) {
        throwError('No solar systems exist anywhere...', 404);
    } else {
        const systems = [];
        for (const solarSystem of solarSystems) {
            const planets = await aggregatePlanets(solarSystem);
            systems.push({
                name: solarSystem,
                totalMass: planets.totalMass,
                numberOfPlanets: planets.numberOfPlanets,
            });
        }
        return systems;
    }
};

module.exports = { getSolarSystems };

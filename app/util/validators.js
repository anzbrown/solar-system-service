const Joi = require('joi');

const planetSchema = Joi.object({
    name: Joi.string().required(),
    solarSystem: Joi.string().required(),
    mass: Joi.number().required(),
    diameter: Joi.number().required(),
    density: Joi.number().required(),
    gravity: Joi.number().required(),
    escapeVelocity: Joi.number().required(),
    rotationPeriod: Joi.number(),
    lengthOfDay: Joi.number(),
    distanceFromSun: Joi.number().required(),
    perihelion: Joi.number(),
    aphelion: Joi.number(),
    orbitalPeriod: Joi.number(),
    orbitalVelocity: Joi.number(),
    orbitalInclination: Joi.number(),
    orbitalEccentricity: Joi.number(),
    obliquityToOrbit: Joi.number(),
    meanTemperature: Joi.number().required(),
    surfacePressure: Joi.number(),
    numberOfMoons: Joi.number().required(),
    hasRingSystem: Joi.boolean().required(),
    hasGlobalMagneticField: Joi.boolean().required(),
});

/**
 * validate the new planet to ensure they meet the required schema
 * @param planet - the new planet to add to a solar system
 * @returns {Promise<any>}
 */
const validatePlanet = async planet =>
    await planetSchema.validateAsync(planet, { abortEarly: false });

module.exports = { validatePlanet };

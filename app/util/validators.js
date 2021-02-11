const Joi = require('joi');

const planetSchema = Joi.object({
    name: Joi.string().alphanum().required(),
    mass: Joi.number().required(),
    diameter: Joi.number().required(),
    density: Joi.number().required(),
    gravity: Joi.number().required(),
    escapeVelocity: Joi.number().required(),
    rotationPeriod: Joi.number().required(),
    lengthOfDay: Joi.number().required(),
    distanceFromSun: Joi.number().required(),
    perihelion: Joi.number().required(),
    aphelion: Joi.number().required(),
    orbitalPeriod: Joi.number().required(),
    orbitalVelocity: Joi.number().required(),
    orbitalInclination: Joi.number().required(),
    orbitalEccentricity: Joi.number().required(),
    obliquityToOrbit: Joi.number().required(),
    meanTemperature: Joi.number().required(),
    surfacePressure: Joi.number().required(),
    numberOfMoons: Joi.number().required(),
    hasRingSystem: Joi.boolean().required(),
    hasGlobalMagneticField: Joi.boolean().required(),
});

const satelliteSchema = Joi.object({
    planetId: Joi.number().required(),
    name: Joi.string().alphanum().required(),
    gm: Joi.number().required(),
    radius: Joi.number().required(),
    density: Joi.number().required(),
    magnitude: Joi.number().required(),
    albedo: Joi.number().required(),
});

/**
 * validate the new planet to ensure they meet the required schema
 * @param planet - the new planet to add to a solar system
 * @returns {Promise<any>}
 */
const validatePlanet = async planet => planetSchema.validateAsync(planet);

/**
 * validate the new satellite to ensure they meet the required schema
 * @param satellite - the new satellite to add to a solar system
 * @returns {Promise<any>}
 */
const validateSatellite = async satellite =>
    satelliteSchema.validateAsync(satellite);

module.exports = { validatePlanet, validateSatellite };

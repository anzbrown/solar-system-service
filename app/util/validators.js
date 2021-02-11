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

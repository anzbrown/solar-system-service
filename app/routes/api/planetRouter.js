const express = require('express');
const {
    getPlanets,
    getPlanet,
    updatePlanet,
} = require('../../service/planetService');

const planetRouter = express.Router();
const planetPath = '/:solarSystem/planets';

/**
 * @swagger
 * /{solarSystem}/planets:
 *   get:
 *     summary: get a list of all the planets in the solar system
 *     description: Returns a list of all the planets in the solar system.
 *     parameters:
 *       - in: path
 *         name: solarSystem
 *         required: true
 *         description: The name of the solar system to retrieve information for.
 *         schema:
 *           type: string
 *
 *     responses:
 *       "200":
 *         description: A successful solar system response will return a list of
 *          any planets inside the solar system. If the solar system does not exist
 *          then a 404 status code with an error message is returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: the name of the planet
 *                     example: Earth
 *       "404":
 *         description: An solar system with no known planets was searched for.
 *          Check your spelling of the solar system name, making sure to include
 *          spaces in names such as "Milky Way"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The info message that no planets exist in this solar system
 *                   example: No planets exist in MilkyWay
 *       "500":
 *         description: An internal error has occurred. Likely a loss of database connection.
 */
planetRouter.get(planetPath, async (req, res, next) => {
    try {
        const { solarSystem } = req.params;
        const planets = await getPlanets(solarSystem);
        return planets?.length > 0
            ? res.send(planets)
            : res.status(404).send({
                  message: `No planets exist in: ${solarSystem}`,
              });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /{solarSystem}/planets/{name}:
 *   get:
 *     summary: get detailed planetary information about the specific planet
 *     description: Returns detailed planetary information including mass,
 *      diameter, density, gravity, among others
 *     parameters:
 *       - in: path
 *         name: solarSystem
 *         required: true
 *         description: The name of the solar system to retrieve information for.
 *         schema:
 *           type: string
 *       - in: path
 *         name: name
 *         required: true
 *         description: The name of the planet in the solar system
 *         schema:
 *           type: string
 *
 *     responses:
 *       "200":
 *         description: A successful solar system response will return a list of
 *          any planets inside the solar system. If the solar system does not exist
 *          then a 404 status is returned with an error message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Earth
 *                 solarSystem:
 *                   type: string
 *                   example: Milky Way
 *                 mass:
 *                   type: number
 *                   example: 5.97
 *                 diameter:
 *                   type: number
 *                   example: 12756
 *                 density:
 *                   type: number
 *                   example: 5514
 *                 gravity:
 *                   type: number
 *                   example: 9.8
 *                 escapeVelocity:
 *                   type: number
 *                   example: 11.2
 *                 rotationPeriod:
 *                   type: number
 *                   example: 23.9
 *                 lengthOfDay:
 *                   type: number
 *                   example: 24
 *
 *
 *       "404":
 *         description: A non-existing planet was used.
 *          Check your spelling of the planet name, making sure to include
 *          spaces in names such as "Electric Boogaloo"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The info message that no planets exist in this solar system
 *                   example: No planet exists named Electric Boogaloo in Andromeda
 *       "500":
 *         description: An internal error has occurred. Likely a loss of database connection.
 */
planetRouter.get(`${planetPath}/:name`, async (req, res, next) => {
    try {
        const { solarSystem, name } = req.params;
        const planet = await getPlanet(solarSystem, name);
        return planet
            ? res.send(planet)
            : res.status(404).send({
                  message: `No planet exists named: ${name} in ${solarSystem}`,
              });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /{solarSystem}/planets:
 *   post:
 *     summary: Create new or Update existing planetary information
 *     description: If a planet does not exist with a specific name and solar system
 *      value, then a new planet is created with the provided values.
 *      If the planet does exist with the same name and solar system values, then its values are
 *      replaced with the new values from the request body.
 *     parameters:
 *       - in: path
 *         name: solarSystem
 *         required: true
 *         description: The name of the solar system the planet exists within.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Earth
 *               mass:
 *                 type: number
 *                 example: 5.97
 *               diameter:
 *                 type: number
 *                 example: 12756
 *               density:
 *                 type: number
 *                 example: 5514
 *               gravity:
 *                 type: number
 *                 example: 9.8
 *               escapeVelocity:
 *                 type: number
 *                 example: 11.2
 *               rotationPeriod:
 *                 type: number
 *                 example: 23.9
 *               lengthOfDay:
 *                 type: number
 *                 example: 24
 *               distanceFromSun:
 *                 type: number
 *                 example: 149.6
 *               perihelion:
 *                 type: number
 *                 example: 147.
 *               aphelion:
 *                 type: number
 *                 example: 152.1
 *               orbitalPeriod:
 *                 type: number
 *                 example: 365.2
 *               orbitalVelocity:
 *                 type: number
 *                 example: 29.8
 *               orbitalInclination:
 *                 type: number
 *                 example: 0
 *               orbitalEccentricity:
 *                 type: number
 *                 example: 0.017
 *               obliquityToOrbit:
 *                 type: number
 *                 example: 23.4
 *               meanTemperature:
 *                 type: number
 *                 example: 15
 *               surfacePressure:
 *                 type: number
 *                 example: 1
 *               numberOfMoons:
 *                 type: number
 *                 example: 1
 *               hasRingSystem:
 *                 type: boolean
 *                 example: true
 *               hasGlobalMagneticField:
 *                 type: boolean
 *                 example: false
 *
 *     responses:
 *       "201":
 *         description: A planet has been successfully created or updated with
 *          the planetary information provided in the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: New Earth
 *                 solarSystem:
 *                   type: string
 *                   example: Andromeda
 *                 mass:
 *                   type: number
 *                   example: 5.97
 *                 diameter:
 *                   type: number
 *                   example: 12756
 *                 density:
 *                   type: number
 *                   example: 5514
 *                 gravity:
 *                   type: number
 *                   example: 9.8
 *                 escapeVelocity:
 *                   type: number
 *                   example: 11.2
 *                 rotationPeriod:
 *                   type: number
 *                   example: 23.9
 *                 lengthOfDay:
 *                   type: number
 *                   example: 24
 *                 distanceFromSun:
 *                   type: number
 *                   example: 149.6
 *                 perihelion:
 *                   type: number
 *                   example: 147.
 *                 aphelion:
 *                   type: number
 *                   example: 152.1
 *                 orbitalPeriod:
 *                   type: number
 *                   example: 365.2
 *                 orbitalVelocity:
 *                   type: number
 *                   example: 29.8
 *                 orbitalInclination:
 *                   type: number
 *                   example: 0
 *                 orbitalEccentricity:
 *                   type: number
 *                   example: 0.017
 *                 obliquityToOrbit:
 *                   type: number
 *                   example: 23.4
 *                 meanTemperature:
 *                   type: number
 *                   example: 15
 *                 surfacePressure:
 *                   type: number
 *                   example: 1
 *                 numberOfMoons:
 *                   type: number
 *                   example: 1
 *                 hasRingSystem:
 *                   type: boolean
 *                   example: true
 *                 hasGlobalMagneticField:
 *                   type: boolean
 *                   example: false
 *
 *       "500":
 *         description: An internal error has occurred. Likely a loss of database connection.
 */
planetRouter.post(planetPath, async (req, res, next) => {
    try {
        const { solarSystem } = req.params;
        const planet = req.body;
        await updatePlanet(solarSystem, planet);
        res.status(201).send(planet);
    } catch (error) {
        next(error);
    }
});
module.exports = {
    planetRouter,
};

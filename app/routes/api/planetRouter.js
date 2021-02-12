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
 *          then a 204 status code with an empty body is returned.
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
 *       "204":
 *         description: An solar system with no known planets was searched for.
 *          Check your spelling of the solar system name, making sure to include
 *          spaces in names such as "Milky Way"
 *       "500":
 *         description: An internal error has occurred. Likely a loss of database connection.
 */
planetRouter.get(planetPath, async (req, res, next) => {
    try {
        const { solarSystem } = req.params;
        const planets = await getPlanets(solarSystem);
        planets?.length > 0 ? res.send(planets) : res.status(204).send();
    } catch (error) {
        next(error);
    }
});
planetRouter.get(`${planetPath}/:name`, async (req, res, next) => {
    try {
        const { solarSystem, name } = req.params;
        const planet = await getPlanet(solarSystem, name);
        res.send(planet);
    } catch (error) {
        next(error);
    }
});
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

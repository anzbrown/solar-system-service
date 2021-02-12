const express = require('express');
const { getSolarSystems } = require('../../service/solarSystemService');

const solarSystemRouter = express.Router();
const solarSystemPath = '/';

/**
 * @swagger
 * /:
 *   get:
 *     summary: get a summary of solar systems
 *     description: Return a list of solar systems including their name, total
 *      mass of planets, and the number of planets in each system.
 *
 *     responses:
 *       "200":
 *         description: A successful solar system response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: the name of the solar system
 *                     example: Milky Way
 *                   totalMass:
 *                     type: number
 *                     description: the total sum of planetary mass in the solar system
 *                     example: 7964666.5064
 *                   numberOfPlanets:
 *                     type: number
 *                     description: the total number of planets inside the solar system
 *                     example: 10
 *       "500":
 *         description: An internal error has occurred. Likely a loss of database connection.
 */
solarSystemRouter.get(solarSystemPath, async (req, res, next) => {
    try {
        const planets = await getSolarSystems();
        res.send(planets);
    } catch (error) {
        next(error);
    }
});
module.exports = {
    solarSystemRouter,
};

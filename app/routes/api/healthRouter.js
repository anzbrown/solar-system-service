const express = require('express');

const healthRouter = express.Router();
const healthPath = '/health';

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Service status health check endpoint to test that the service
 *      is running successfully.
 *     description: Return 200 OK with a status message of UP if the service
 *      is running
 *     responses:
 *       "200":
 *         description: A successful health response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: the UP status of the service
 *                   example: UP
 */
healthRouter.get(healthPath, async (_req, res) => {
    const healthy = { status: 'UP' };
    res.send(healthy);
});
module.exports = healthRouter;

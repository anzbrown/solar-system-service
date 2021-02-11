const express = require('express');

const healthRouter = express.Router();
const healthPath = '/health';

healthRouter.all(healthPath, async (_req, res) => {
    const healthy = { status: 'UP' };
    res.send(healthy);
});
module.exports = {
    healthRouter,
};

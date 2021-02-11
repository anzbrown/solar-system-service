const express = require('express');
const { getSolarSystems } = require('../../service/solarSystemService');

const solarSystemRouter = express.Router();
const solarSystemPath = '/';

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

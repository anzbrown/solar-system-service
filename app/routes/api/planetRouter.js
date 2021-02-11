const express = require('express');
const {
    getPlanets,
    getPlanet,
    addPlanet,
    updatePlanet,
} = require('../../service/planetService');

const planetRouter = express.Router();
const planetPath = '/:solarSystem/planets';

planetRouter.get(planetPath, async (req, res, next) => {
    try {
        const { solarSystem } = req.params;
        const planets = await getPlanets(solarSystem);
        res.send(planets);
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
        await addPlanet(solarSystem, planet);
        res.send(planet);
    } catch (error) {
        next(error);
    }
});
planetRouter.put(planetPath, async (req, res, next) => {
    try {
        const planet = req.body;
        await updatePlanet(planet);
        res.send(planet);
    } catch (error) {
        next(error);
    }
});
module.exports = {
    planetRouter,
};

const express = require('express');
const {
    getPlanets,
    getPlanet,
    addPlanet,
    updatePlanet,
} = require('../../service/planetService');

const planetRouter = express.Router();
const planetPath = '/planets';

planetRouter.get(planetPath, async (req, res, next) => {
    try {
        const planets = await getPlanets();
        res.send(planets);
    } catch (error) {
        next(error);
    }
});
planetRouter.get(`${planetPath}/:name`, async (req, res, next) => {
    try {
        const planet = await getPlanet(req.params.name);
        res.send(planet);
    } catch (error) {
        next(error);
    }
});
planetRouter.post(planetPath, async (req, res, next) => {
    try {
        const planet = req.body;
        await addPlanet(planet);
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

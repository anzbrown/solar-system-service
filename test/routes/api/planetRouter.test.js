const express = require('express');
const bodyParser = require('body-parser');
const supertest = require('supertest');
const errorHandler = require('../../../app/routes/middleware/errorHandler');
const planetRouter = require('../../../app/routes/api/planetRouter');
const planetService = require('../../../app/service/planetService');
jest.mock('../../../app/service/planetService');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/solarsystem', planetRouter);
app.use((error, req, res, next) => errorHandler(error, req, res, next));

describe('/solarsystem/:solarSystem/planets Get planets in solar system', () => {
    const expectedPlanets = [
        {
            name: 'Mercury',
        },
        {
            name: 'Venus',
        },
        {
            name: 'Earth',
        },
    ];
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return a list of planet names', async done => {
        jest.spyOn(planetService, 'getPlanets').mockImplementation(
            () => expectedPlanets
        );
        supertest(app)
            .get('/api/solarsystem/Milky Way/planets')
            .expect(200)
            .expect(res => {
                expect(res.body).toEqual(expectedPlanets);
            })
            .end(done);
    });

    it('should return 404 when no planets exist in a solar system', async done => {
        planetService.getPlanets.mockImplementation(() => {
            const error = new Error('No planets exist in: Andromeda');
            error.status = 404;
            throw error;
        });
        supertest(app)
            .get('/api/solarsystem/Andromeda/planets')
            .expect(404)
            .expect(res => {
                expect(res.body).toEqual({
                    message: 'No planets exist in: Andromeda',
                });
            })
            .end(done);
    });
});

describe('/solarsystem/:solarSystem/planets/:planet Get planet in solar system', () => {
    const expectedPlanet = {
        name: 'Earth',
        solarSystem: 'Milky Way',
        mass: 5.97,
        diameter: 12756,
        density: 5514,
        gravity: 9.8,
        escapeVelocity: 11.2,
        rotationPeriod: 23.9,
        lengthOfDay: 24,
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return detailed planetary information', async done => {
        jest.spyOn(planetService, 'getPlanet').mockImplementation(
            () => expectedPlanet
        );
        supertest(app)
            .get('/api/solarsystem/Milky Way/planets/Earth')
            .expect(200)
            .expect(res => {
                expect(res.body).toEqual(expectedPlanet);
            })
            .end(done);
    });

    it('should return 404 when no planet exist in a specific solar system', async done => {
        planetService.getPlanet.mockImplementation(() => {
            const error = new Error(
                'No planet exists named: New Earth in: Andromeda'
            );
            error.status = 404;
            throw error;
        });
        supertest(app)
            .get('/api/solarsystem/Andromeda/planets/New Earth')
            .expect(404)
            .expect(res => {
                expect(res.body).toEqual({
                    message: 'No planet exists named: New Earth in: Andromeda',
                });
            })
            .end(done);
    });
});

describe('/solarsystem/:solarSystem/planets/:planet Create planet in solar system', () => {
    const expectedPlanet = {
        updated: 0,
        updatedPlanet: {
            name: 'Earth',
            solarSystem: 'Milky Way',
            mass: 5.97,
            diameter: 12756,
            density: 5514,
            gravity: 9.8,
            escapeVelocity: 11.2,
            rotationPeriod: 23.9,
            lengthOfDay: 24,
        },
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should create a new planet in the Milky Way', async done => {
        jest.spyOn(planetService, 'updatePlanet').mockImplementation(
            () => expectedPlanet
        );
        supertest(app)
            .post('/api/solarsystem/Milky Way/planets')
            .send(expectedPlanet.updatedPlanet)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(res => {
                expect(res.body).toEqual(expectedPlanet.updatedPlanet);
            })
            .end(done);
    });
    it('should update an existing planet in the Milky Way', async done => {
        // mark the expected planet as a updated instead of created
        expectedPlanet.updated = 1;
        jest.spyOn(planetService, 'updatePlanet').mockImplementation(
            () => expectedPlanet
        );
        supertest(app)
            .post('/api/solarsystem/Milky Way/planets')
            .send(expectedPlanet.updatedPlanet)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(res => {
                expect(res.body).toEqual(expectedPlanet.updatedPlanet);
            })
            .end(done);
    });

    it('should return 400 when an invalid planet is passed in', async done => {
        const invalidPlanet = {
            escapeVelocity: 11.2,
            rotationPeriod: 23.9,
            lengthOfDay: 24,
        };
        planetService.updatePlanet.mockImplementation(() => {
            const error = new Error('Validation error');
            error.status = 400;
            throw error;
        });
        supertest(app)
            .post('/api/solarsystem/Milky Way/planets')
            .send(invalidPlanet)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(res => {
                expect(res.body).toEqual({
                    message: 'Validation error',
                });
            })
            .end(done);
    });
});

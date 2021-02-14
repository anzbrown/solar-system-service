const express = require('express');
const bodyParser = require('body-parser');
const supertest = require('supertest');
const errorHandler = require('../../../app/routes/middleware/errorHandler');
const solarSystemRouter = require('../../../app/routes/api/solarSystemRouter');
const solarSystemService = require('../../../app/service/solarSystemService');
jest.mock('../../../app/service/solarSystemService');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/solarsystem', solarSystemRouter);
app.use((error, req, res, next) => errorHandler(error, req, res, next));

describe('/solarsystem endpoint testing', () => {
    const expectedSolarSystems = [
        {
            name: 'Milky Way',
            totalMass: 7964666.5064,
            numberOfPlanets: 10,
        },
    ];
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return a list of solar systems', async done => {
        jest.spyOn(solarSystemService, 'getSolarSystems').mockImplementation(
            () => expectedSolarSystems
        );
        supertest(app)
            .get('/api/solarsystem')
            .expect(200)
            .expect(res => {
                expect(res.body).toEqual(expectedSolarSystems);
            })
            .end(done);
    });
    it('should return an empty array if no solar systems exist', async done => {
        jest.spyOn(
            solarSystemService,
            'getSolarSystems'
        ).mockImplementation(() => []);
        supertest(app)
            .get('/api/solarsystem')
            .expect(200)
            .expect(res => {
                expect(res.body).toEqual([]);
            })
            .end(done);
    });
    it('should return a 404 if no solar systems exist', async done => {
        solarSystemService.getSolarSystems.mockImplementation(() => {
            const error = new Error('No solar systems exist anywhere...');
            error.status = 404;
            throw error;
        });
        supertest(app)
            .get('/api/solarsystem')
            .expect(404)
            .expect(res => {
                expect(res.body).toEqual({
                    message: 'No solar systems exist anywhere...',
                });
            })
            .end(done);
    });
});

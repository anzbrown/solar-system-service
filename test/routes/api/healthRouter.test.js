const express = require('express');
const bodyParser = require('body-parser');

const healthRoute = require('../../../app/routes/api/healthRouter');
const supertest = require('supertest');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', healthRoute);

describe('/health endpoint testing', () => {
    it('should return a healthy status from the /health endpoint', async done => {
        supertest(app)
            .get('/api/health')
            .expect(200)
            .expect(res => {
                expect(res.body).toEqual({ status: 'UP' });
            })
            .end(done);
    });
});

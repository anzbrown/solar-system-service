const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const { helm, corsOptions } = require('./config/securitySettings');
const { errorHandler } = require('./routes/middleware/errorHandler');
const { healthRouter } = require('./routes/api/healthRouter');
const { planetRouter } = require('./routes/api/planetRouter');
const { solarSystemRouter } = require('./routes/api/solarSystemRouter');

const app = () => {
    const expressApi = express();
    const baseApiRoute = '/api/solarsystems';

    // enable CORS for testing
    expressApi.use(helm);
    expressApi.use(corsOptions);
    expressApi.use(bodyParser.urlencoded({ extended: true }));
    expressApi.use(express.json());
    expressApi.use(compression());

    // Unauthenticated routes
    expressApi.use(baseApiRoute, healthRouter);
    expressApi.use(baseApiRoute, planetRouter);
    expressApi.use(baseApiRoute, solarSystemRouter);

    // error handler
    expressApi.use((error, req, res, next) =>
        errorHandler(error, req, res, next)
    );

    return expressApi;
};
module.exports = {
    app,
};

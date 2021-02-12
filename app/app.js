const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpecification } = require('./config/swaggerConfig');
const { helm, corsOptions } = require('./config/securitySettings');
const { errorHandler } = require('./routes/middleware/errorHandler');
const { healthRouter } = require('./routes/api/healthRouter');
const { planetRouter } = require('./routes/api/planetRouter');
const { solarSystemRouter } = require('./routes/api/solarSystemRouter');

const app = () => {
    const expressApi = express();
    const baseApiRoute = '/api/solarsystems';

    expressApi.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpecification, { explorer: true })
    );
    expressApi.use(helm);
    expressApi.use(corsOptions);
    expressApi.use(bodyParser.urlencoded({ extended: true }));
    expressApi.use(express.json());
    expressApi.use(compression());

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

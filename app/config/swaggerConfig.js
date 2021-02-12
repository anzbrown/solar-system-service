const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Solar System Informaton Express API with Swagger',
            version: '0.1.0',
            description:
                'This is a simple CRUD API application made with Express and documented with Swagger',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Adam Brown',
                url: 'https://github.com/anzbrown',
                email: '',
            },
        },
        servers: [
            {
                url: `http://localhost:8080/api/solarsystems`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./app/routes/api/*.js'],
};
const swaggerSpecification = swaggerJsdoc(swaggerDefinition);
module.exports = {
    swaggerSpecification,
};

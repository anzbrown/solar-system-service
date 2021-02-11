const { app } = require('./app');
const { mongo } = require('./config/mongo');
const { logger } = require('./util/logger');

const port = process.env.PORT || 8080;
const application = app();
mongo.connect();

const server = application.listen(port, async () => {
    logger.info(`Application started. Listening on port: ${port}`);
});

// graceful shutdown handler
process.on('SIGTERM', async () => {
    logger.error('SIGTERM signal received.');
    logger.error('Closing http server.');
    await mongo.close();
    server.close(async () => {
        logger.info('Http server closed.');
        process.exit(0);
    });
});

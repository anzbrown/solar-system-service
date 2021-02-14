const helmet = require('helmet');
const cors = require('cors');

/**
 * CORS configuration for webapp
 */
const corsOptions = cors({
    origin: ['*'],
});

/**
 * enable HTTP security headers using helmet lib
 * can be extended later without polluting the {{app.js}} file with excessive
 * config details
 */
const helm = helmet();

module.exports = {
    helm,
    corsOptions,
};

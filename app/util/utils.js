/**
 * throw an error and populate with error message information
 * the error will be caught and propagated by the errorHandler middleware function
 * @param message to include in the response body
 * @param status HTTP status code
 */
const throwError = (message, status) => {
    const error = new Error(message);
    error.status = status;
    throw error;
};

module.exports = {
    throwError,
};

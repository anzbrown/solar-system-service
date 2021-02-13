/**
 * capitalize the first letter of a word
 * useful for lookups on the data where the documents are capitalized
 * @param string
 * @returns {string}
 */
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

/**
 * pascal case the string e.g. milky way turns to Milky Way
 * useful for lookups on data where the solarSystem is stored as pascal case
 */
const pascalCase = string =>
    string.replace(
        /\w\S*/g,
        m => m.charAt(0).toUpperCase() + m.slice(1).toLowerCase()
    );

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
    capitalize,
    pascalCase,
    throwError,
};

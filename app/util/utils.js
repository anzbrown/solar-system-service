// function to capitalize the first letter of a word
// useful for lookups on the data where the documents are capitalized
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);
module.exports = {
    capitalize,
};

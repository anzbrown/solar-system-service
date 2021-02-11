const Joi = require('joi');

const menuItemSchema = Joi.object({
    text: Joi.string().alphanum().required(),
    iconHint: Joi.string().alphanum().required(),
    url: Joi.string().uri({ relativeOnly: true }),
    priority: Joi.number().required(),
    rolesAllowed: Joi.array().min(0).items(Joi.string()),
    items: Joi.array().items(Joi.string()),
});

/**
 * validate the array of menu items to ensure they meet the required schema
 * @param menu array of menu items
 * @returns {Promise<any>}
 */
const validateMenu = async menu =>
    Joi.array().items(menuItemSchema).validateAsync(menu);

module.exports = { validateMenu };

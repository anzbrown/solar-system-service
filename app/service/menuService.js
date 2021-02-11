const { validateMenu } = require('../util/validators');
const { saveMenu, getMenuByTenantId } = require('../repository/menuRepository');

/**
 * sort the menu list by priority attribute, save into Firestore DB
 * @param menus list of menu items to sort and persist
 * @param tenantId
 * @returns sorted menu list
 */
const updateMenu = async (menus, tenantId) => {
    try {
        await validateMenu(menus);
        menus.sort((itemA, itemB) => itemA.priority - itemB.priority);
        await saveMenu(menus, tenantId);
        return menus;
    } catch (err) {
        const error = new Error(err.message);
        error.status = 400;
        throw error;
    }
};

/**
 * retrieve menu list from Firestore DB by tenantId
 * @param tenantId to use as the key to retrieve from Firestore
 * @returns menu list for tenant
 */
const getMenu = async tenantId => {
    const menu = await getMenuByTenantId(tenantId);
    if (menu) {
        return Object.values(menu);
    } else {
        const error = new Error('No menu exists for Tenant');
        error.status = 404;
        throw error;
    }
};

module.exports = { updateMenu, getMenu };

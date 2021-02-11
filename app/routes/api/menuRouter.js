const express = require('express');
const { getMenu, updateMenu } = require('../../service/menuService');

const menuRouter = express.Router();
const menuPath = '/menu';

menuRouter.get(menuPath, async (req, res, next) => {
    try {
        const menus = await getMenu();
        res.send(menus);
    } catch (error) {
        next(error);
    }
});
menuRouter.post(menuPath, async (req, res, next) => {
    try {
        const menuItems = req.body;
        await updateMenu(menuItems);
        res.send(menuItems);
    } catch (error) {
        next(error);
    }
});
module.exports = {
    menuRouter,
};

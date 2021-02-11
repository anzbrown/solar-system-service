const { describe, expect, test } = require('@jest/globals');
const { updateMenu, getMenu } = require('../../app/service/menuService');
const menuRepository = require('../../app/repository/menuRepository');

jest.mock('../../app/repository/menuRepository');

const testMenu = [
    {
        text: 'Adam',
        iconHint: 'faGamepad',
        url: '/adam',
        priority: 2,
        rolesAllowed: [],
        items: ['test', 'games'],
    },
    {
        text: 'Heather',
        iconHint: 'faMountain',
        url: '/heather',
        priority: 1,
        rolesAllowed: [],
        items: ['hobbies', 'career'],
    },
    {
        text: 'Leia',
        iconHint: 'faCat',
        url: '/leia',
        priority: 0,
        rolesAllowed: [],
        items: ['collar', 'colour'],
    },
    {
        text: 'Jessie',
        iconHint: 'faDog',
        url: '/jessie',
        priority: 4,
        rolesAllowed: [],
        items: ['collar', 'colour'],
    },
];
const expectedMenu = [
    {
        iconHint: 'faCat',
        items: ['collar', 'colour'],
        priority: 0,
        rolesAllowed: [],
        text: 'Leia',
        url: '/leia',
    },
    {
        iconHint: 'faMountain',
        items: ['hobbies', 'career'],
        priority: 1,
        rolesAllowed: [],
        text: 'Heather',
        url: '/heather',
    },
    {
        iconHint: 'faGamepad',
        items: ['test', 'games'],
        priority: 2,
        rolesAllowed: [],
        text: 'Adam',
        url: '/adam',
    },
    {
        iconHint: 'faDog',
        items: ['collar', 'colour'],
        priority: 4,
        rolesAllowed: [],
        text: 'Jessie',
        url: '/jessie',
    },
];
const tenant = 'test';

describe('updateMenu', () => {
    test('should sort menus by priority and save into FireStore', async () => {
        jest.spyOn(menuRepository, 'saveMenu').mockImplementation(
            () => expectedMenu
        );
        const result = await updateMenu(testMenu, tenant);
        expect(menuRepository.saveMenu).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedMenu);
    });
});

describe('getMenu', () => {
    const fireStoredMenu = {
        0: {
            url: '/leia',
            items: ['collar', 'colour'],
            rolesAllowed: [],
            priority: 0,
            text: 'Leia',
            iconHint: 'faCat',
        },
        1: {
            items: ['hobbies', 'career'],
            priority: 1,
            text: 'Heather',
            rolesAllowed: [],
            iconHint: 'faMountain',
            url: '/heather',
        },
        2: {
            url: '/adam',
            iconHint: 'faGamepad',
            rolesAllowed: [],
            text: 'Adam',
            priority: 2,
            items: ['test', 'games'],
        },
        3: {
            iconHint: 'faDog',
            rolesAllowed: [],
            items: ['collar', 'colour'],
            url: '/jessie',
            text: 'Jessie',
            priority: 4,
        },
    };
    test('should retrieve menu by tenant Id', async () => {
        jest.spyOn(menuRepository, 'getMenuByTenantId').mockImplementation(
            () => fireStoredMenu
        );
        const result = await getMenu(tenant);
        expect(result).toEqual(expectedMenu);
    });
});

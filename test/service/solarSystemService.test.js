const { describe, expect, test } = require('@jest/globals');
const planetRepository = require('../../app/repository/planetRepository');
const { getSolarSystems } = require('../../app/service/solarSystemService');
jest.mock('../../app/repository/planetRepository');

const expectedSolarSystems = ['Milky Way'];
const expectedAggregate = {
    _id: 'Milky Way',
    totalMass: 5339.2232,
};
const expectedSolarSummary = [
    {
        name: 'Milky Way',
        totalMass: 5339.2232,
    },
];

describe('getSolarSystems', () => {
    test('should retrieve all solar systems with data and aggregate their total mass', async () => {
        jest.spyOn(planetRepository, 'findAllSolarSystems').mockImplementation(
            () => expectedSolarSystems
        );
        jest.spyOn(planetRepository, 'aggregateMass').mockImplementation(
            () => expectedAggregate
        );
        const result = await getSolarSystems();
        expect(planetRepository.findAllSolarSystems).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedSolarSummary);
    });
});

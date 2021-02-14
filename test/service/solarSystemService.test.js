const { describe, expect, test } = require('@jest/globals');
const planetRepository = require('../../app/repository/planetRepository');
const { getSolarSystems } = require('../../app/service/solarSystemService');
jest.mock('../../app/repository/planetRepository');

const expectedSolarSystems = ['Milky Way'];
const expectedAggregate = {
    _id: 'Milky Way',
    totalMass: 5339.2232,
    numberOfPlanets: 10,
};
const expectedSolarSummary = [
    {
        name: 'Milky Way',
        totalMass: 5339.2232,
        numberOfPlanets: 10,
    },
];

describe('getSolarSystems', () => {
    beforeEach(() => jest.clearAllMocks());

    test('should retrieve all solar systems with data and aggregate their total mass', async () => {
        jest.spyOn(planetRepository, 'findAllSolarSystems').mockImplementation(
            () => expectedSolarSystems
        );
        jest.spyOn(planetRepository, 'aggregatePlanets').mockImplementation(
            () => expectedAggregate
        );
        const result = await getSolarSystems();
        expect(planetRepository.findAllSolarSystems).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedSolarSummary);
    });

    test('should return a warning when no solar systems are found', async () => {
        jest.spyOn(planetRepository, 'findAllSolarSystems').mockImplementation(
            () => null
        );
        try {
            await getSolarSystems();
        } catch (err) {
            expect(planetRepository.findAllSolarSystems).toHaveBeenCalledTimes(
                1
            );
            expect(planetRepository.aggregatePlanets).toHaveBeenCalledTimes(0);
            expect(err.status).toEqual(404);
            expect(err.message).toEqual('No solar systems exist anywhere...');
        }
    });
});

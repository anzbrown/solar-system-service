const { describe, expect, test } = require('@jest/globals');
const planetRepository = require('../../app/repository/planetRepository');
const validators = require('../../app/util/validators');
const {
    getPlanets,
    getPlanet,
    updatePlanet,
} = require('../../app/service/planetService');

jest.mock('../../app/repository/planetRepository');
jest.mock('../../app/util/validators', () => {
    return {
        validatePlanet: jest.fn(),
    };
});

describe('getPlanets', () => {
    beforeEach(() => jest.clearAllMocks());
    test('should retrieve all planets in the Milky Way solar system', async () => {
        const expectedSolarSummary = [
            {
                name: 'Mercury',
            },
            {
                name: 'Venus',
            },
            {
                name: 'Sol',
            },
            {
                name: 'Pluto',
            },
            {
                name: 'Uranus',
            },
            {
                name: 'Earth',
            },
            {
                name: 'Neptune',
            },
            {
                name: 'Jupiter',
            },
            {
                name: 'Saturn',
            },
            {
                name: 'Mars',
            },
        ];
        jest.spyOn(planetRepository, 'findAllBySolarSystem').mockImplementation(
            () => expectedSolarSummary
        );
        const result = await getPlanets('milky way');
        expect(planetRepository.findAllBySolarSystem).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedSolarSummary);
    });
    test('should return an empty array for a non-existant solar system', async () => {
        jest.spyOn(
            planetRepository,
            'findAllBySolarSystem'
        ).mockImplementation(() => []);
        const result = await getPlanets('test');
        expect(planetRepository.findAllBySolarSystem).toHaveBeenCalledTimes(1);
        expect(result).toEqual([]);
    });
});

describe('getPlanet', () => {
    beforeEach(() => jest.clearAllMocks());
    test('should retrieve information on a specific planet in the solar system', async () => {
        const expectedPlanet = {
            name: 'Earth',
            solarSystem: 'Milky Way',
            mass: 5.97,
            diameter: 12756,
            density: 5514,
            gravity: 9.8,
            escapeVelocity: 11.2,
            rotationPeriod: 23.9,
            lengthOfDay: 24,
            distanceFromSun: 149.6,
            perihelion: 147.1,
            aphelion: 152.1,
            orbitalPeriod: 365.2,
            orbitalVelocity: 29.8,
            orbitalInclination: 0,
            orbitalEccentricity: 0.017,
            obliquityToOrbit: 23.4,
            meanTemperature: 15,
            surfacePressure: 1,
            numberOfMoons: 1,
            hasRingSystem: false,
            hasGlobalMagneticField: false,
        };
        jest.spyOn(planetRepository, 'findByName').mockImplementation(
            () => expectedPlanet
        );
        const result = await getPlanet('milky way', 'Earth');
        expect(planetRepository.findByName).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedPlanet);
    });
    test('should return null for a non-existant planet', async () => {
        jest.spyOn(planetRepository, 'findByName').mockImplementation(
            () => null
        );
        const result = await getPlanet('milky way', 'test');
        expect(planetRepository.findByName).toHaveBeenCalledTimes(1);
        expect(result).toBeNull();
    });
});

describe('updatePlanet', () => {
    beforeEach(() => jest.clearAllMocks());

    describe('valid planet', () => {
        let expectedPlanet, updatedPlanet;
        beforeEach(() => {
            jest.clearAllMocks();
            beforeEach(() => jest.clearAllMocks());
            updatedPlanet = {
                name: 'Earth',
                solarSystem: 'Milky Way',
                mass: 6.66,
                diameter: 987654,
                density: 5514,
                gravity: 9.8,
                escapeVelocity: 11.2,
                rotationPeriod: 23.9,
                lengthOfDay: 24,
                distanceFromSun: 149.6,
                perihelion: 147.1,
                aphelion: 152.1,
                orbitalPeriod: 365.2,
                orbitalVelocity: 29.8,
                orbitalInclination: 0,
                orbitalEccentricity: 0.017,
                obliquityToOrbit: 23.4,
                meanTemperature: 15,
                surfacePressure: 1,
                numberOfMoons: 1,
                hasRingSystem: false,
                hasGlobalMagneticField: false,
            };
            expectedPlanet = {
                name: 'Earth',
                solarSystem: 'Milky Way',
                mass: 6.66,
                diameter: 987654,
                density: 5514,
                gravity: 9.8,
                escapeVelocity: 11.2,
                rotationPeriod: 23.9,
                lengthOfDay: 24,
                distanceFromSun: 149.6,
                perihelion: 147.1,
                aphelion: 152.1,
                orbitalPeriod: 365.2,
                orbitalVelocity: 29.8,
                orbitalInclination: 0,
                orbitalEccentricity: 0.017,
                obliquityToOrbit: 23.4,
                meanTemperature: 15,
                surfacePressure: 1,
                numberOfMoons: 1,
                hasRingSystem: false,
                hasGlobalMagneticField: false,
            };
            jest.spyOn(planetRepository, 'createPlanet').mockImplementation(
                () => expectedPlanet
            );
            jest.spyOn(validators, 'validatePlanet').mockImplementation(
                () => true
            );
        });
        test('should not throw any exceptions for a valid planet object', async () => {
            expect(
                async () => await updatePlanet('milky way', updatedPlanet)
            ).not.toThrow();
        });
        test('should update and return the updated planet information', async () => {
            const result = await updatePlanet('milky way', updatedPlanet);
            expect(result).toEqual(expectedPlanet);
        });
    });
});

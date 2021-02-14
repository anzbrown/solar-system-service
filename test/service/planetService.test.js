const planetRepository = require('../../app/repository/planetRepository');
const validators = require('../../app/util/validators');
const {
    getPlanets,
    getPlanet,
    updatePlanet,
} = require('../../app/service/planetService');

jest.mock('../../app/repository/planetRepository');

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
        planetRepository.findAllBySolarSystem.mockImplementation(
            () => expectedSolarSummary
        );
        const result = await getPlanets('milky way');
        expect(planetRepository.findAllBySolarSystem).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedSolarSummary);
    });
    test('should return an empty array for a non-existant solar system', async () => {
        planetRepository.findAllBySolarSystem.mockImplementation(() => []);
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
        planetRepository.findByName.mockImplementation(() => expectedPlanet);
        const result = await getPlanet('milky way', 'Earth');
        expect(planetRepository.findByName).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedPlanet);
    });
    test('should return null for a non-existant planet', async () => {
        planetRepository.findByName.mockImplementation(() => null);
        const result = await getPlanet('milky way', 'test');
        expect(planetRepository.findByName).toHaveBeenCalledTimes(1);
        expect(result).toBeNull();
    });
});

describe('updatePlanet', () => {
    beforeEach(() => jest.clearAllMocks());

    describe('valid planet', () => {
        let updatedPlanet,
            newPlanet,
            expectedUpdatedPlanet,
            expectedNewPlanet,
            inserted,
            updated;
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
            newPlanet = {
                name: 'New Earth',
                solarSystem: 'Andromeda',
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
            inserted = {
                result: {
                    n: 1,
                    nModified: 0,
                },
            };
            updated = {
                result: {
                    n: 1,
                    nModified: 1,
                },
            };
            expectedUpdatedPlanet = {
                updatedPlanet: {
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
                },
                updated: 1,
            };
            expectedNewPlanet = {
                updatedPlanet: {
                    name: 'New Earth',
                    solarSystem: 'Andromeda',
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
                },
                updated: 0,
            };
            validators.validatePlanet = jest.fn(() => true);
            planetRepository.createPlanet.mockImplementation(() => inserted);
        });
        test('should not throw any exceptions for a valid planet object', async () => {
            validators.validatePlanet = jest.fn(() => true);
            expect(
                async () => await updatePlanet('milky way', updatedPlanet)
            ).not.toThrow();
        });
        test('should not try to create a planet when the request object is invalid', async () => {
            try {
                await updatePlanet('milky way', {});
            } catch (err) {
                expect(planetRepository.createPlanet).toHaveBeenCalledTimes(0);
                expect(err.status).toEqual(400);
                // expect the missing required fields to be returned in the error message
                expect(err.message).toEqual(
                    '"name" is required. "mass" is required. "diameter" is required. "density" is required. "gravity" is required. "escapeVelocity" is required. "distanceFromSun" is required. "meanTemperature" is required. "numberOfMoons" is required. "hasRingSystem" is required. "hasGlobalMagneticField" is required'
                );
            }
        });
        test('should update and return the updated planet information', async () => {
            planetRepository.createPlanet.mockImplementation(() => updated);
            const result = await updatePlanet('milky way', updatedPlanet);
            expect(result).toEqual(expectedUpdatedPlanet);
        });
        test('should create and return the updated planet information', async () => {
            const result = await updatePlanet('Andromeda', newPlanet);
            expect(result).toEqual(expectedNewPlanet);
        });
    });
});

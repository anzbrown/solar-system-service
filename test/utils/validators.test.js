const { validatePlanet } = require('../../app/util/validators');
describe('validatePlanet', () => {
    beforeEach(() => jest.clearAllMocks());
    test('should return true if a valid planet is passed in', async () => {
        const planet = {
            name: 'new earth',
            solarSystem: 'andromeda',
            mass: 5.97,
            diameter: 12756,
            density: 5514,
            gravity: 9.8,
            escapeVelocity: 11.2,
            rotationPeriod: 23.9,
            lengthOfDay: 24,
            distanceFromSun: 149.6,
            perihelion: 147,
            aphelion: 152.1,
            orbitalPeriod: 365.2,
            orbitalVelocity: 29.8,
            orbitalInclination: 0,
            orbitalEccentricity: 0.017,
            obliquityToOrbit: 23.4,
            meanTemperature: 15,
            surfacePressure: 1,
            numberOfMoons: 1,
            hasRingSystem: true,
            hasGlobalMagneticField: false,
        };
        const result = await validatePlanet(planet);
        expect(result).toBeTruthy();
    });
    test('should warn about missing name and solarSystem values', async () => {
        try {
            const planet = {
                mass: 5.97,
                diameter: 12756,
                density: 5514,
                gravity: 9.8,
                escapeVelocity: 11.2,
                rotationPeriod: 23.9,
                lengthOfDay: 24,
                distanceFromSun: 149.6,
                perihelion: 147,
                aphelion: 152.1,
                orbitalPeriod: 365.2,
                orbitalVelocity: 29.8,
                orbitalInclination: 0,
                orbitalEccentricity: 0.017,
                obliquityToOrbit: 23.4,
                meanTemperature: 15,
                surfacePressure: 1,
                numberOfMoons: 1,
                hasRingSystem: true,
                hasGlobalMagneticField: false,
            };
            await validatePlanet(planet);
        } catch (err) {
            expect(err.message).toEqual(
                '"name" is required. "solarSystem" is required'
            );
        }
    });
});

const { throwError } = require('../../app/util/utils');
describe('throwError', () => {
    beforeEach(() => jest.clearAllMocks());
    test('should extend the Error class with a HTTP status and message', () => {
        const status = 404,
            message = 'hello world';
        try {
            throwError(message, status);
        } catch (err) {
            expect(err.message).toEqual(message);
            expect(err.status).toEqual(status);
        }
    });
});

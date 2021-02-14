const errorHandler = require('../../../app/routes/middleware/errorHandler');

describe('errorHandler', () => {
    let mockRequest, mockResponse, mockNext;
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {};
        mockResponse.status = jest.fn().mockReturnValue(mockResponse);
        mockResponse.json = jest.fn().mockReturnValue(mockResponse);
        mockNext = jest.fn();
    });
    test('should set the response object with a 404 status and an custom message', () => {
        const error = {
            status: 404,
            message: 'Custom error message',
        };
        errorHandler(error, mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Custom error message',
        });
        expect(mockNext.mock.calls.length).toBe(1);
    });
    test('should set the response object with a 500 status and the default error message', () => {
        errorHandler({}, mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
        });
        expect(mockNext.mock.calls.length).toBe(1);
    });
});

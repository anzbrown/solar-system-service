const errorHandler = (error, request, response, next) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response.status(status).json({
        message,
    });
    next(error);
};
module.exports = {
    errorHandler,
};

import httpStatusCodes from 'http-status-codes';
import UnauthenticatedError from '../errors/UnauthenticatedError.js';
import NotFoundError from '../errors/NotFoundError.js';

const logger = (error, req, res, next) => {
    console.error(`error at ${req.url}:\n`, error);
    next(error);
};

const responder = (error, req, res, next) => {
    if (error instanceof NotFoundError) {
        return res.status(httpStatusCodes.NOT_FOUND).render('error/NotFoundError', {
            title: '404 Error', 
            message: error.message
        });
    }

    if (error instanceof UnauthenticatedError) {
        return res.status(httpStatusCodes.UNAUTHORIZED).render('error/UnauthenticatedError', {
            title: '401 Error',
            message: error.message
        });
    }

    next(error);
};

const failSafeHandler = (error, req, res) => {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).render('error/InternalServerError', {
        title: 'Internal server error',
        message: 'internal server error.' 
    });
};

export {
    logger,
    responder,
    failSafeHandler
};

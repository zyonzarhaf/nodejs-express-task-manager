import httpStatusCodes from 'http-status-codes';
import UnauthenticatedError from '../errors/UnauthenticatedError.js';
import BadRequestError from '../errors/BadRequestError.js';
import NotFoundError from '../errors/NotFoundError.js';

const logger = (error, req, res, next) => {
    console.error(error);
    next(error);
};

const responder = (error, req, res, next) => {
    if (error instanceof NotFoundError) {
        return res.status(error.status).render('error/index', {
            title: error.name, 
            status: error.status,
            message: error.message
        });
    }

    if (error instanceof UnauthenticatedError) {
        return res.status(error.status).render('error/index', {
            title: error.name,
            status: error.status,
            message: error.message
        });
    }

    if (error instanceof BadRequestError) {
        return res.status(error.status).render('error/index', {
            title: error.name,
            status: error.status,
            message: error.message
        });
    }

    next(error);
};

const failSafeHandler = (error, req, res, next) => {
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

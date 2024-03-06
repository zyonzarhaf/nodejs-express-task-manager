import httpStatusCodes from 'http-status-codes';
import NotFoundError from '../../errors/NotFoundError.js';
import BadRequestError from '../../errors/BadRequestError.js';
import InvalidTokenError from '../../errors/InvalidTokenError.js';

const logger = (error, req, res, next) => {
    console.error(error);
    next(error);
}

const responder = (error, req, res, next) => {
    if (error instanceof NotFoundError) {
        return res.status(error.status).json({ message: error.message });
    } 

    if (error instanceof InvalidTokenError) {
        return res.status(error.status).json({ message: error.message });
    } 

    if (error instanceof BadRequestError) {
        return res.status(error.status).json({ message: error.message });
    } 
}

const failSafeHandler = (error, req, res, next) => {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error'
    });
}

export { logger, responder, failSafeHandler };

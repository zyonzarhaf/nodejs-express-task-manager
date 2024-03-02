import httpStatusCodes from 'http-status-codes';

class BadRequestError extends Error {
    constructor (message) {
        super(message);
        this.name = 'BadRequestError',
        this.status = httpStatusCodes.BAD_REQUEST;
    } 
}

export default BadRequestError;

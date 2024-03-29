import httpStatusCodes from 'http-status-codes';

class UnauthenticatedError extends Error {
    constructor (message) {
        super(message);
        this.name = 'UnauthenticatedError';
        this.status = httpStatusCodes.UNAUTHORIZED;
    }
}

export default UnauthenticatedError;

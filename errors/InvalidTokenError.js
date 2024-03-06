import httpStatusCodes from 'http-status-codes';

class InvalidTokenError extends Error {
    constructor (message) {
        super(message);
        this.name = 'InvalidTokenError';
        this.status = httpStatusCodes.UNAUTHORIZED;
    }
}

export default InvalidTokenError;

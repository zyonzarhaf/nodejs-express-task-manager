import httpStatusCodes from 'http-status-codes';

class NotFoundError extends Error {
    constructor (message) {
        super(message);
        this.name = 'NotFoundError';
        this.status = httpStatusCodes.NOT_FOUND;
    }
}

export default NotFoundError;

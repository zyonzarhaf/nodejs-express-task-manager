import httpStatusCodes from 'http-status-codes';

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.httpStatusCode = httpStatusCodes.NOT_FOUND;
    }
}

export default NotFoundError;

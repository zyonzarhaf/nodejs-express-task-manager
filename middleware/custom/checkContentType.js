import httpStatusCodes from 'http-status-codes';

const checkContentType = (req, res, next) => {
    if (!req.is('application/json')) {
        return res.status(httpStatusCodes.UNSUPPORTED_MEDIA_TYPE).send('Only json is a supported media type for this kind of payload.');
    }

    next();
}

export default checkContentType;

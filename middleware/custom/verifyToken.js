import asyncWrapper from '../../middleware/custom/async.js';
import InvalidTokenError from '../../errors/InvalidTokenError.js';
import User from '../../models/user.js';

const verifyToken = asyncWrapper(async (req, res, next) => {
    const token = req.get('authorization');

    if (!token) throw new InvalidTokenError('A valid token is required to access this kind of resource.');

    const isValidToken = await User.exists({ apiToken: token }).exec();

    if (!isValidToken) throw new InvalidTokenError('Invalid API token.');

    const { _id, apiToken } = await User.findOne({ apiToken: token }).exec();
    req.user = { _id, apiToken };
    next();
});

export default verifyToken;

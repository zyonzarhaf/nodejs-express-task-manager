import UnauthenticatedError from '../../errors/UnauthenticatedError.js';
import BadRequestError from '../../errors/BadRequestError.js';

const checkUserAuth = (req, res, next) => {
    try {
        if (!req.isAuthenticated()) {
            throw new UnauthenticatedError('User is not authenticated.');
        }

        if (req.params.userId !== req.user.id) {
            throw new BadRequestError(`The request contains an invalid or wrong user id: ${req.params.userId}.`);
        }
        next();
    } catch (error) {
        next(error);
    }
}

export default checkUserAuth;

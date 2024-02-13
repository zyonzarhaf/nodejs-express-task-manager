import UnauthenticatedError from '../../errors/UnauthenticatedError.js';
import NotFoundError from '../../errors/NotFoundError.js';

const checkUserAuth = (req, res, next) => {
    try {
        if (!req.isAuthenticated()) {
            throw new UnauthenticatedError('User is not authenticated.');
        }

        if (!(req.params.userId === req.user.id)) {
            throw new NotFoundError('User not found.');
        }
        next();
    } catch (error) {
        next(error);
    }
}

export default checkUserAuth;

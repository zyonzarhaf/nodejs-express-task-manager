import NotFoundError from '../../errors/NotFoundError.js';

const notFoundResponse = (req, res, next) => {
    next(new NotFoundError('The resource you were looking for was not found.'));
}

export default notFoundResponse;

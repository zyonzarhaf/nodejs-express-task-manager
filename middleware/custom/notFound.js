import httpStatusCodes from 'http-status-codes';

const notFound = (req, res) => {
    res.status(httpStatusCodes.NOT_FOUND).render('error/NotFoundError', {
        title: '404 Error',
        message: 'The resource you were looking for was not found.'
    });
}

export default notFound;

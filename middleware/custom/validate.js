import {
    body,
    validationResult
} from 'express-validator';

const validate = async (req, res, next) => {
    const validations = [
        body(['first', 'last'], 'invalid name')
        .trim()
        .notEmpty()
        .isString()
        .run(req),

        body('email', 'invalid email')
        .trim()
        .notEmpty()
        .normalizeEmail()
        .isEmail()
        .run(req),

        body('password', 'invalid password')
        .if(body('password')
            .notEmpty())
        .trim()
        .isLength({
            min: 8,
            max: 28
        })
        .run(req),
    ];

    await Promise.all(validations);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const messages = errors
        .array()
        .map(error => error.msg);

        req.flash('error', messages.join(' and '));
        req.skip = true;
        res.locals.redirect = '/';
        return next();
    }

    next();
}

export default validate;

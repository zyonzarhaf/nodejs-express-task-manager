import {
    body,
    validationResult
} from 'express-validator';

const runValidations = async (req, validations) => {
    await Promise.all(validations.map(validation => validation.run(req))); 
}

const handleValidationResult = (req, res, next, redirect) => {
    const errors = validationResult(req).array();
    const { path } = redirect;

    if (errors.length > 0) {
        const messages = errors.map(error => error.msg);

        console.error(`Validation error at ${req.originalUrl}:\n`, errors);

        req.flash('error', messages.join(' and '));
        req.skip = true;
        res.locals.redirect = path;

        return next();
    }

    next();
}

const validateUser = async (req, res, next) => {
    const validations = [
        body(['first_name', 'last_name'])
            .trim()
            .notEmpty()
            .withMessage('Missing name'),

        body('email')
            .trim()
            .notEmpty()
            .withMessage('Missing email')
            .bail()
            .isEmail()
            .normalizeEmail(),

        body('password')
            .trim()
            .notEmpty()
            .withMessage('Missing password')
            .bail()
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)
            .withMessage(`
                Password must meet the following criteria:
                - At least one digit (0-9)
                - At least one lowercase letter (a-z)
                - At least one uppercase letter (A-Z)
                - At least one special character (e.g., !@#$%^&*)
                - Minimum length of 8 characters`
            ),

        body('password_confirmation')
            .trim()
            .notEmpty()
            .custom((value, { req }) => {
                return value === req.body.password
            })
            .withMessage(`Passwords don't match`)
    ];

    await runValidations(req, validations);

    handleValidationResult(req, res, next, {
        path: '/user/register'
    });
}

const validateUpdatedUser = async (req, res, next) => {
    const { userId } = req.params;
    const validations = [
        body(['first_name', 'last_name'])
            .trim()
            .notEmpty()
            .withMessage('Missing name'),

        body('email')
            .trim()
            .notEmpty()
            .withMessage('Missing email')
            .bail()
            .isEmail()
            .normalizeEmail(),

        body('password')
            .trim()
            .notEmpty()
            .withMessage('Missing password')
            .bail()
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)
            .withMessage(`
                Password must meet the following criteria:
                - At least one digit (0-9)
                - At least one lowercase letter (a-z)
                - At least one uppercase letter (A-Z)
                - At least one special character (e.g., !@#$%^&*)
                - Minimum length of 8 characters`
        )
    ];

    await runValidations(req, validations);

    handleValidationResult(req, res, next, {
        path: `/user/${userId}/account/edit`
    });
}

const validateTask = async (req, res, next) => {
    const { userId } = req.params;
    const validations = [
        body('description')
            .trim()
            .notEmpty()
            .withMessage('Missing task description'),

        body('priority')
            .isIn(['low', 'medium', 'high'])
            .default('low'),

        body('due')
            .toDate()
            .default(undefined)
    ];

    await runValidations(req, validations);

    handleValidationResult(req, res, next, {
        path: `/user/${userId}/tasks`
    });
}

const validateUpdatedTask = async (req, res, next) => {
    const { userId } = req.params;
    const validations = [
        body('description')
            .trim()
            .notEmpty()
            .withMessage('Missing task description'),

        body('priority')
            .isIn(['low', 'medium', 'high'])
            .default('low'),

        body('due')
            .toDate()
            .default(undefined),

        body('project')
            .trim()
            .notEmpty()
            .default(undefined)
    ];

    await runValidations(req, validations);

    handleValidationResult(req, res, next, {
        path: `/user/${userId}/tasks`
    });
}

export { validateUser, validateUpdatedUser, validateTask, validateUpdatedTask };

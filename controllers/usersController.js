import asyncWrapper from '../middleware/custom/async.js';
import passport from 'passport';
import User from '../models/user.js';
import UnauthenticatedError from '../errors/UnauthenticatedError.js';

const createUser = asyncWrapper(async (req, res, next) => {
    if (req.skip) return next();

    const {
        first,
        last,
        email,
        password
    } = req.body;

    const newUser = {
        name: {
            first,
            last
        },
        email,
        password
    }

    await User.create(newUser);

    req.flash('success', 'congratulations, you can now log into your new account');
    res.locals.redirect = '/user/login';
    next();
});

const updateUser = asyncWrapper(async (req, res, next) => {
    if (req.skip) return next();

    if (!req.isAuthenticated()) {
        throw new UnauthenticatedError('User is not authenticated.');
    }

    if (!req.params.userId === req.user.id) {
        throw new UnauthenticatedError('User not found.');
    }

    const userId = req.params.userId;

    const {
        first,
        last,
        email,
        password
    } = req.body;

    const newUser = {
        name: {
            first,
            last
        },
        email,
        password
    }

    await User.findByIdAndUpdate(userId, newUser);

    req.flash('success', 'congratulations, your account has been successfully updated');
    res.locals.redirect = `/user/${userId}/account`;
    next();
});

const deleteUser = asyncWrapper(async (req, res, next) => {
    if (!req.isAuthenticated()) {
        throw new UnauthenticatedError('User is not authenticated.');
    }

    if (!req.params.userId === req.user.id) {
        throw new UnauthenticatedError('User not found.');
    }

    const userId = req.params.userId;

    await User.findByIdAndDelete(userId);

    req.flash('success', 'congratulations, your account has been successfully deleted');
    res.locals.redirect = '/';
    next();
});

const renderUserAccount = asyncWrapper(async (req, res) => {
    if (!req.isAuthenticated()) {
        throw new UnauthenticatedError('User is not authenticated.');
    }

    if (!req.params.userId === req.user.id) {
        throw new UnauthenticatedError('User not found.');
    }

    const userId = req.params.userId;
    const userInfo = await User.findById(userId);

    res.render('user/account', {
        title: 'user',
        userInfo
    });
});

const renderEditForm = asyncWrapper(async (req, res) => {
    if (!req.isAuthenticated()) {
        throw new UnauthenticatedError('User is not authenticated.');
    }

    if (!req.params.userId === req.user.id) {
        throw new UnauthenticatedError('User not found.');
    }

    const userId = req.params.userId;
    const user = await User.findById(userId);

    res.render('user/edit', {
        title: 'Edit user account',
        user
    });
});

const renderLoginForm = (req, res) => {
    res.render('user/login', {
        title: 'Login'
    });
};

const renderRegistrationForm = (req, res) => {
    res.render('user/register', {
        title: 'Register account'
    });
}

const authenticate = (req, res, next) => {
    passport.authenticate(
        'local-user',
        (err, user, info) => {
            if (err) return next(err);

            const infoMsg = info.message;

            if (!user) {
                req.flash('error', infoMsg);
                return res.redirect('/user/login');
            }

            req.logIn(user, (err) => {
                if (err) return next(err);
                req.flash('success', infoMsg);
                return res.redirect(`/user/${user.id}/tasks`);
            });
        }
    )(req, res, next);
};

const logout = (req, res, next) => {
    req.logout((error) => {
        if (error) return next(error);
        req.flash('success', 'successfully logged out');
        res.locals.redirect = '/';
        next();
    });
}

export {
    createUser,
    updateUser,
    deleteUser,
    renderUserAccount,
    renderEditForm,
    renderLoginForm,
    renderRegistrationForm,
    authenticate,
    logout
}

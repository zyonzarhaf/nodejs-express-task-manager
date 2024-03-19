import asyncWrapper from '../middleware/custom/async.js';
import passport from 'passport';
import User from '../models/user.js';

const createUser = asyncWrapper(async (req, res, next) => {
    if (req.skip) return next();

    await User.create(req.body);
    req.flash('success', 'congratulations, you can now log into your new account');
    res.locals.redirect = '/user/login';
    next();
});

const updateUser = asyncWrapper(async (req, res, next) => {
    if (req.skip) return next();

    const { userId } = req.params;
    const formData = req.body;

    await User.findOneAndUpdate({ _id: userId }, formData).exec();
    res.locals.redirect = `/user/${userId}/account`;
    req.flash('success', 'congratulations, your account has been successfully updated');
    next();
});

const deleteUser = asyncWrapper(async (req, res, next) => {
    const { userId } = req.params;

    await User.findOneAndDelete({ _id: userId }).exec();
    res.locals.redirect = '/';
    req.flash('success', 'congratulations, your account has been successfully deleted');
    next();
});

const renderUserAccount = asyncWrapper(async (req, res) => {
    const { userId } = req.params; 
    const user = await User.findOne({ _id: userId }).exec();

    res.render('user/account', {
        title: 'user',
        user
    });
});

const renderEditForm = asyncWrapper(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId }).exec();

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

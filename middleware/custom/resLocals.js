const resLocals = app => {
    app.use(async (req, res, next) => {
        res.locals.flashMessage = req.flash();
        res.locals.loggedIn = req.isAuthenticated();
        res.locals.user = req.user;
        next();
    });
};

export default resLocals;

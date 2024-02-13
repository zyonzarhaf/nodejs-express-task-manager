import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../../models/user.js';

const usePassport = app => {
    app.use(passport.initialize());
    app.use(passport.session());

    const createNewLocalStrategy = options => {
        const {
            usernameField,
            passwordField,
            model
        } = options;

        return new LocalStrategy({
                usernameField,
                passwordField
            },
            async (username, password, done) => {
                try {
                    const user = await model
                        .findOne({
                            email: username
                        });

                    if (!user) return done(null, false, {
                        message: 'user does not exist'
                    });

                    const isMatch = await user
                        .comparePasswords(password);

                    if (!isMatch) return done(null, false, {
                        message: 'incorrect password'
                    });

                    return done(null, user, {
                        message: 'you have successfully logged in'
                    });
                } catch (err) {
                    return done(err);
                }
            }
        )
    };

    const user = createNewLocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        model: User
    });

    passport.use('local-user', user);

    passport.serializeUser((user, done) => {
        process.nextTick(() => {
            done(null, {
                id: user._id,
                email: user.email,
                name: user.name
            });
        });
    });

    passport.deserializeUser((user, done) => {
        process.nextTick(() => {
            return done(null, user);
        });
    });
};

export default usePassport;

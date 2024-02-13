import session from 'express-session';

const useSession = app => {
    app.use(session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 600000 }
    }));
};

export default useSession;

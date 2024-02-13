import flash from 'express-flash';

const useFlash = app => {
    app.use(flash());
};

export default useFlash;

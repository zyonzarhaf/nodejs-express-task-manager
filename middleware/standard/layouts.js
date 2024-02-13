import layouts from 'express-ejs-layouts';

const useLayouts = app => {
    app.use(layouts);
    app.set('layout extractScripts', true);
};

export default useLayouts;

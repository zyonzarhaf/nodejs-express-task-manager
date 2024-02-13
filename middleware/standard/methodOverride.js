import methodOverride from 'method-override';

const useMethodOverride = app => {
    app.use(methodOverride('_method', {
        methods: ['POST', 'GET']
    }));
};

export default useMethodOverride;

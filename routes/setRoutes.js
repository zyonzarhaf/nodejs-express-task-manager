import homeRouter from './homeRoutes.js';
import userRouter from './userRoutes.js';
import taskRouter from './taskRoutes.js';

const setRoutes = app => {
    app.use(homeRouter);
    app.use(userRouter);
    app.use(taskRouter);
}

export default setRoutes;

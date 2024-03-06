import express from 'express';
import homeRouter from './homeRoutes.js';
import userRouter from './userRoutes.js';
import taskRouter from './taskRoutes.js';

const router = express.Router();

    router.use('/user/:userId/tasks', taskRouter);
    router.use('/user', userRouter);
    router.use('/', homeRouter);

export default router;

import express from 'express';
import checkUserAuth from '../middleware/custom/checkUserAuth.js';
import redirectView from '../middleware/custom/redirectView.js';

import {
    createTask,
    updateTask,
    deleteTask,
    deleteAllTasks,
    renderTasks
} from '../controllers/tasksController.js';

const router = express.Router();

router
    .route('/user/:userId/tasks')
    .get(checkUserAuth, renderTasks, redirectView)
    .delete(checkUserAuth, deleteAllTasks, redirectView);

router 
    .route('/user/:userId/tasks/new')
    .post(checkUserAuth, createTask, redirectView)

router
    .route('/user/:userId/tasks/:taskId')
    .delete(checkUserAuth, deleteTask, redirectView);

router 
    .route('/user/:userId/tasks/:taskId/edit')
    .put(checkUserAuth, updateTask, redirectView)
    .delete(checkUserAuth, deleteTask, redirectView);

export default router;

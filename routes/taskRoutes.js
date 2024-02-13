import express from 'express';
import checkUserAuth from '../middleware/custom/checkUserAuth.js';
import redirectView from '../middleware/custom/redirectView.js';

import {
    createTask,
    updateTask,
    deleteTask,
    deleteAllTasks,
    renderTasks,
    renderTask,
    renderNewForm,
    renderEditForm
} from '../controllers/tasksController.js';

const router = express.Router();

router
    .route('/user/:userId/tasks')
    .get(checkUserAuth, renderTasks, redirectView)
    .delete(checkUserAuth, deleteAllTasks, redirectView);

router 
    .route('/user/:userId/tasks/new')
    .get(checkUserAuth, renderNewForm)
    .post(checkUserAuth, createTask, redirectView)

router
    .route('/user/:userId/tasks/:taskId')
    .get(checkUserAuth, renderTask)
    .delete(checkUserAuth, deleteTask, redirectView);

router 
    .route('/user/:userId/tasks/:taskId/edit')
    .get(checkUserAuth, renderEditForm)
    .put(checkUserAuth, updateTask, redirectView)
    .delete(checkUserAuth, deleteTask, redirectView);

export default router;

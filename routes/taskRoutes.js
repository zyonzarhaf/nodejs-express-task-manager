import express from 'express';
import { validateTask, validateUpdatedTask } from '../middleware/custom/validators.js';
import redirectView from '../middleware/custom/redirectView.js';
import checkUserAuth from '../middleware/custom/checkUserAuth.js';

import {
    createTask,
    updateTask,
    deleteTask,
    deleteAllTasks,
    renderTasks
} from '../controllers/tasksController.js';

const router = express.Router({ mergeParams: true });

router.use(checkUserAuth);

router.route('/:taskId')
      .put(validateUpdatedTask, updateTask, redirectView)
      .delete(deleteTask, redirectView);

router.route('/')
      .get(renderTasks, redirectView)
      .post(validateTask, createTask, redirectView)
      .delete(deleteAllTasks, redirectView);

export default router;

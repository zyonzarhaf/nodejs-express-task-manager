import express from 'express';
import verifyToken from '../../middleware/custom/verifyToken.js';
import checkContentType from '../../middleware/custom/checkContentType.js';

import {
    getTasks,
    getTask,
    createTask,
    updateTask
} from '../controllers/tasksController.js';

const router = express.Router({ mergeParams: true });

router.route('/:taskId')
      .get(verifyToken, getTask)
      .put(checkContentType, verifyToken, updateTask);

router.route('/')
      .get(verifyToken, getTasks)
      .post(checkContentType, verifyToken, createTask);

export default router;

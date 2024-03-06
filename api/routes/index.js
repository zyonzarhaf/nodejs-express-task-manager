import express from 'express';
import taskApiRoutes from './taskApiRoutes.js';
import userApiRoutes from './userApiRoutes.js';
import notFoundResponse from '../../middleware/custom/notFoundResponse.js';

import { logger, responder } from '../controllers/errorsController.js';

const router = express.Router();

router.use('/api/user/tasks', taskApiRoutes);
router.use('/api/user', userApiRoutes);
router.use(notFoundResponse);
router.use(logger);
router.use(responder);

export default router;

import express from 'express';
import checkContentType from '../../middleware/custom/checkContentType.js';
import verifyToken from '../../middleware/custom/verifyToken.js';

import { getUser, createUser } from '../controllers/usersController.js';

const router = express.Router({ mergeParams: true });

router.route('/account')
      .get(verifyToken, getUser);

router.route('/register')
      .post(checkContentType, createUser);

export default router;

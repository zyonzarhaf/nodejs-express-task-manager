import express from 'express';
import { validateUser, validateUpdatedUser } from '../middleware/custom/validators.js';
import redirectView from '../middleware/custom/redirectView.js';
import checkUserAuth from '../middleware/custom/checkUserAuth.js';

import {
    createUser,
    updateUser,
    deleteUser,
    renderUserAccount,
    renderEditForm,
    renderLoginForm,
    renderRegistrationForm,
    authenticate,
    logout
} from '../controllers/usersController.js';

const router = express.Router();

router.route('/:userId/account/edit')
      .all(checkUserAuth)
      .get(renderEditForm)
      .put(validateUpdatedUser, updateUser, redirectView)
      .delete(deleteUser, redirectView);

router.route('/:userId/account')
      .all(checkUserAuth)
      .get(renderUserAccount)
      .delete(deleteUser, redirectView);

router.route('/login')
      .get(renderLoginForm)
      .post(authenticate);

router.route('/logout')
      .get(logout, redirectView);

router.route('/register')
      .get(renderRegistrationForm)
      .post(validateUser, createUser, redirectView);

export default router;

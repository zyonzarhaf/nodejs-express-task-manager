import express from 'express';
import validate from '../middleware/custom/validate.js';
import checkUserAuth from '../middleware/custom/checkUserAuth.js';
import redirectView from '../middleware/custom/redirectView.js';

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

router
    .route('/user/login')
    .get(renderLoginForm)
    .post(authenticate);

router  
    .route('/user/logout')
    .get(logout, redirectView);

router
    .route('/user/register')
    .get(renderRegistrationForm)
    .post(validate, createUser, redirectView);

router
    .route('/user/:userId/account')
    .get(checkUserAuth, renderUserAccount);

router
    .route('/user/:userId/account/edit')
    .get(checkUserAuth, renderEditForm)
    .put(checkUserAuth, validate, updateUser, redirectView)
    .delete(checkUserAuth, deleteUser, redirectView);


export default router;

import express from 'express';
import { getAvailableController, getAvailablityStatusController, getContainer, therapistLoginController, therapistToggleController, verifyController } from '../controller/therapist.controller.js';
import { Authenticator } from '../middleware/auth.middleware.js';
const therapyRouter = express.Router()
therapyRouter.post('/login', therapistLoginController)
therapyRouter.post('/toggle', Authenticator, therapistToggleController)
therapyRouter.get('/available', Authenticator, getAvailableController)
therapyRouter.get('/if-available/:id', Authenticator, getAvailablityStatusController)
therapyRouter.get('/:id', getContainer)
therapyRouter.post('/verify', Authenticator, verifyController)
export default therapyRouter
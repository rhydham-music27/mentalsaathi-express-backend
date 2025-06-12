import express from 'express';
import { getAvailableController, therapistLoginController, therapistToggleController } from '../controller/therapist.controller.js';
import { Authenticator } from '../middleware/auth.middleware.js';
const therapyRouter = express.Router()
therapyRouter.post('/login', therapistLoginController)
therapyRouter.post('/toggle', Authenticator, therapistToggleController)
therapyRouter.get('/available',Authenticator,getAvailableController)
export default therapyRouter
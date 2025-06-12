import express from 'express';
import { Authenticator } from '../middleware/auth.middleware.js';
import { addTherapistController, adminAuthLoginController, getActiveController, getNecessaryController, getUserController, PingController } from '../controller/admin.controller.js';

const adminRouter = express.Router()


adminRouter.get('/ping', Authenticator, PingController)
adminRouter.get('/active-count', Authenticator, getActiveController);
adminRouter.get('/totalUser', Authenticator, getUserController)
adminRouter.get('/get-important', Authenticator, getNecessaryController)
adminRouter.post('/login', adminAuthLoginController)
adminRouter.post('/add-therapist',addTherapistController)


export default adminRouter
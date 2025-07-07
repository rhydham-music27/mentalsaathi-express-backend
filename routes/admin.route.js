import express from 'express';
import { AdminAuthenticator } from '../middleware/auth.middleware.js';
import { addTherapistController, adminAuthLoginController, getActiveController, getNecessaryController, getUserController, PingController } from '../controller/admin.controller.js';

const adminRouter = express.Router()


adminRouter.get('/ping', PingController)
// adminRouter.get('/active-count', AdminAuthenticator, getActiveController);
adminRouter.get('/totalUser', AdminAuthenticator, getUserController)
adminRouter.get('/get-important', AdminAuthenticator, getNecessaryController)
adminRouter.post('/login', adminAuthLoginController)
adminRouter.post('/add-therapist',addTherapistController)


export default adminRouter
import express from 'express';
import { Authenticator } from '../middleware/auth.middleware.js';
import redis from '../config/redis.js';
import { adminAuthLoginController, getActiveController, getNecessaryController, getUserController, PingController } from '../controller/admin.controller.js';
const adminRouter = express.Router()
adminRouter.get('/ping', Authenticator, PingController)
// routes/activeCount.js
adminRouter.get('/active-count', Authenticator, getActiveController);
adminRouter.get('/totalUser', Authenticator, getUserController)
adminRouter.get('/get-important', Authenticator, getNecessaryController)
adminRouter.post('/login', adminAuthLoginController)

export default adminRouter
import express from 'express';
import { Authenticator } from '../middleware/auth.middleware.js';
import redis from '../config/redis.js';
import { getActiveController, getNecessaryController, getUserController, PingController } from '../controller/admin.controller.js';
const adminRouter = express.Router()
adminRouter.get('/ping', Authenticator, PingController)
// routes/activeCount.js
adminRouter.get('/active-count', getActiveController);
adminRouter.get('/totalUser', getUserController)
adminRouter.get('/get-important', getNecessaryController)

export default adminRouter
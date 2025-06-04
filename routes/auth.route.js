import express from 'express';
import { authenticaterController, loginController, signupController } from '../controller/auth.controller.js';
import { Authenticator } from '../middleware/auth.middleware.js';
const authRouter = express.Router();
authRouter.post('/signup', signupController)
authRouter.post('/login', loginController)
authRouter.post('/authenticate',Authenticator, authenticaterController)
export default authRouter
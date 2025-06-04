import express from 'express';
import { Authenticator } from '../middleware/auth.middleware.js';
import { communityController, getCommunityController } from '../controller/post.controller.js';
const postRouter = express.Router()
postRouter.post('/community', Authenticator, communityController)
postRouter.get('/get-community', getCommunityController)

export default postRouter
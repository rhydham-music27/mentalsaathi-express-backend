import express from 'express';
import { Authenticator } from '../middleware/auth.middleware.js';
import { communityController, getCommunityController, LikeByIdController } from '../controller/post.controller.js';
const postRouter = express.Router()
postRouter.post('/community', Authenticator, communityController)
postRouter.get('/get-community', getCommunityController)
postRouter.post('/like/:id', Authenticator, LikeByIdController)
export default postRouter
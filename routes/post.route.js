import express from 'express';
import { Authenticator } from '../middleware/auth.middleware.js';
import { commentController, communityController, getCommunityController, getLikeController, LikeByIdController } from '../controller/post.controller.js';
const postRouter = express.Router()
postRouter.post('/community', Authenticator, communityController)
postRouter.get('/get-community', getCommunityController)
postRouter.post('/like/:id', Authenticator, LikeByIdController)
postRouter.get('/get-post-likes', getLikeController)
postRouter.post('/comment/:id', Authenticator, commentController)
export default postRouter
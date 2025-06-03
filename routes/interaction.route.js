import express from 'express';
import { contactUsController, getInTouchController, waitingListController } from '../controller/interaction.controller.js';

const interactionRouter = express.Router()

interactionRouter.post('/waitinglist', waitingListController)
interactionRouter.post('/contactus', contactUsController)
interactionRouter.post('/getintouch', getInTouchController)
export default interactionRouter
import { Router } from "express";
import { addMessageController, getMessageController } from "../controller/message.controller.js";
const messageRouter = Router()
messageRouter.post('/add', addMessageController)
messageRouter.get('/:roomId', getMessageController)
export default messageRouter
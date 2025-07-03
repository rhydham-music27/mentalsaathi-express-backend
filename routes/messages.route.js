import { Router } from "express";
import { addMessageController } from "../controller/message.controller.js";
const messageRouter = Router()
messageRouter.post('/add', addMessageController)
export default messageRouter
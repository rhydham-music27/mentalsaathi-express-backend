import { Router } from "express";
import { initController, tokenController } from "../controller/stream.controller.js";

const streamRouter = Router();
streamRouter.post('/token', tokenController)
streamRouter.post('/init', initController)
export default streamRouter
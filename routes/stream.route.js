import { Router } from "express";
import { therapistTokenController, tokenController } from "../controller/stream.controller.js";

const streamRouter = Router();
streamRouter.post('/token', tokenController)
streamRouter.post('/therapist/token', therapistTokenController)

export default streamRouter